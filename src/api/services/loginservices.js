const User = require('../../domain/entities/user');
const runInTransaction = require('../../units/helper');
const { generateToken, generateRefreshToken } = require('../../units/jwt');
const { NotFoundError } = require('../middlewares/errorhandler/clientError');

class loginService {
    async verifyLogin( email, password ) {
      const verifyLoginOperation = async(transaction) => {
        const user = await User.findOne({ where: { email,password } });
        if (!user) {
            throw new NotFoundError('Invalid Username or Password');
          }
          const authClaims = {
            email: user.email,
            role: user.role,
            userId: user.user_id,
            jti: new Date().getTime().toString(),
            loginName: user?.userName,
          };
          const token = generateToken(authClaims);
          const refreshToken = generateRefreshToken();
          const userData = {
            id: user.user_id,
            userName: user?.userName,
            role: user.role,
            email: user.email,
            token: token,
            refreshToken: refreshToken,
          };
        return userData
      }
      return runInTransaction(verifyLoginOperation);
    }
  }
  
  
  module.exports = new loginService();