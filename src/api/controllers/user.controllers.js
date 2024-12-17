import UserService from '../services/userservices';

export class UserController {
    createUser = async (request) =>{
        const {  email, password } = request;
        const newUser = await UserService.createUser({  email, password });
        return {
            statusCode: 200,
            data: newUser,
            message: 'user created',
        }
    }
}

