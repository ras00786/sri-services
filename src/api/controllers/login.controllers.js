import { encryptData } from "../configuration/auth";
import loginService from '../services/loginservices';

export class loginController {
    verifyLogin = async (request) =>{
        const {  email, password } = request;
        const encryptedPassword = await encryptData(password);
        const newInfo = await loginService.verifyLogin(
        email,
        encryptedPassword
    )
        return {
            statusCode: 200,
            data: newInfo,
        }
    }
}

