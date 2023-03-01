// Internal import
import { Login } from "./../model/model.login";

export interface ILoginInterface{
    userLogin(data: Login): any;
    userLogOut(): any;
}