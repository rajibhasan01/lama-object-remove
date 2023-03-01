// External import
import { validationResult } from "express-validator";

// Internal import
import { Login } from "../../model/model.login";
import { LoginService } from "../../services/login/service.login";

const loginService = LoginService.getInstance();

/**
 * admin login
 */
export const loginPage = async (req: any, res: any) => {
    const error = (req.session.error !== undefined) ? req.session.error : null;
    delete req.session.error;
    delete req.session.success;
    res.render("pages/login/login.ejs", { title: "Login", error });
}


export const adminLogin = async (req: Request & { body: Login } & {session: any}, res: any) => {
    const data: Login = req.body;

    try {
        const error = validationResult(req).formatWith(({ msg }) => msg);
        const hasError = !error.isEmpty();
        if (hasError) {
            req.session.error = error.array().join(', ');
            res.redirect('/auth/login');
        //   res.status(422).json({ status: 422, message: error.array().join(', ') });
        } else {
            const result:any = await loginService.userLogin(data).catch((err) => {
                throw error;
            });
            if(result){
                req.session.accessToken = result.token;
                delete req.session.error;
                res.redirect('/');
                // res.status(200).json(result);
            }
        }
      } catch (error) {
        req.session.error = "Incorrect Username and/or Password!";
        res.redirect('/auth/login')
        // res.status(403).json({status: 403, message: "Invalid Token" });
      }
};

export const adminLogout = async (req: Request & {session: any}, res: any) => {
    req.session.destroy();
    res.redirect('/auth/login')
}
