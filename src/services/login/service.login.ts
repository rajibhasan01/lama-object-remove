// Internal import
import { Login } from "../../model/model.login";
import { ILoginInterface } from "../../interfaces/ILoginService";
import { ConfigService } from "../../utilities/service.config";
import { JwtAuthentication } from "../../middlewares/common/jwt.varification";

const config = ConfigService.getInstance().getConfig();
const jwt = JwtAuthentication.getInstance();

export class LoginService implements ILoginInterface{
    public static loginService: LoginService;
    private constructor(){};
    public static getInstance(){
        if(!LoginService.loginService) {
            LoginService.loginService = new LoginService();
        }
        return LoginService.loginService;
    }

    public async userLogin(data: Login) {
        try{
            return new Promise(async (resolve, reject) => {
                if(data.username === config.superadmin.username && data.password === config.superadmin.password){
                    jwt.createToken(data).then((token) => {
                        resolve(token);
                    }).catch((error) => {
                        reject(error);
                    })
                } else {
                    reject('failed');
                }

            }).catch((error) => {
                throw error;
            })

        } catch (error) {
            console.log('Error in userLogin service ', error);
            throw error;
        }
    }

    public async userLogOut() {
        throw new Error("Method not implemented.");
    }

}