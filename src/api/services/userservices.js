const User = require('../../domain/entities/user'); // User model
const { encryptData,generateJWT } = require('../configuration/auth');
const { ROLES } = require('../../units/var');
const { DuplicateResourceId } = require('../middlewares/errorhandler/sequalizeError');
const runInTransaction = require('../../units/helper');

class UserService {
  async createUser({ email, password }) {
    const createuserOperation = async(transaction) => {
      const checkEmailExists = await User.findOne({ where: { email } });
      if(checkEmailExists){
        throw new DuplicateResourceId('Email Already Exists.');
      }
      // Convert password to hashpassword
      const hashpassword = await encryptData(password);

      const promises = [];
      promises.push(
        User.create(
          {
            email,
            password: hashpassword,
            role: ROLES.CUSTOMER
          },
          { transaction },
        )
      )
      await Promise.all(promises);
      return {
        isSucess: true,
      };
    }
    return runInTransaction(createuserOperation);
  }

  async  Login({ email, password }) {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid Username or Password');
        }

        // Compare encrypted password with stored password
        const match = encryptData(password) === user.password;
        if (!match) {
            throw new Error('Invalid Username or Password');
        }
        // Optionally, generate a JWT token after successful login
        const token = generateJWT({ id: user.dataValues.id, email: user.dataValues.email });

        return { user,  token }; // Return user details and JWT token
    } catch (error) {
        console.error("Error in Login:", error.message);
        throw error;
    }
  }
}


module.exports = new UserService();
