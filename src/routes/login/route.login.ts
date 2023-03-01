// External import
import express from "express";

// Internal import
import { loginPage, adminLogin, adminLogout } from "./../../controllers/login/controller.login";
import { loginBodyValidation } from "./../../middlewares/validation/validation";


const loginRoute = express.Router();

loginRoute.get('/login', loginPage)
loginRoute.post('/login', loginBodyValidation, adminLogin);
loginRoute.get('/logout', adminLogout);

export = loginRoute;