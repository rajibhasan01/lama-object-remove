export interface IAuthService{
    createToken( userObject: any ) : any;
    verifyToken( token : any ) : any;
}