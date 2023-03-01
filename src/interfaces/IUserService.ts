// Internal import
import { User } from "../model/model.user";

export interface IUserService{
    UserExists(email : string) : any;
    CreateUser(userObject : User) : any;
    EditUser(userObject : User) : any;
    DeleteUser(userObject : any, reqObject: any) : any;
    ResetPassword(userObject:any) : any;
}