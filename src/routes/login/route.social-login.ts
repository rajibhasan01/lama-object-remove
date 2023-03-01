// External imports
import express from "express";
import passport from "passport";
import strategy from "passport-google-oauth2";


import { DbUser } from "../../providers/database/user/db.user";
import { ConfigService } from "../../utilities/service.config";
import { JwtAuthentication } from "../../middlewares/common/jwt.varification";

const dbUser = DbUser.getInstance();
const jwt = JwtAuthentication.getInstance();
const config = ConfigService.getInstance().getConfig();
const authRoutes = express.Router();
const GoogleStrategy = strategy.Strategy;


/** Process social login data */
const processUserData = (userObj:any) => {
    return new Promise(async (resolve, reject) => {
        const token: any = await jwt.createToken(userObj).catch((error) => {
            resolve(config.socialLogin.failedURL);
        });

        const isExist:any = await dbUser.getUserInfo(userObj.email).catch((error:any) => {
            resolve(config.socialLogin.failedURL);
        });

        if(!isExist?._id){
            const result = await dbUser.createNewUser(userObj).catch((error:any) => {
                resolve(config.socialLogin.failedURL);
            });
        }
        resolve(config.socialLogin.successURL + token);

    })
};

passport.use(
    new GoogleStrategy(
      {
        clientID: config.socialLogin.google.clientId,
        clientSecret: config.socialLogin.google.clientSecret,
        callbackURL: config.socialLogin.google.callbackURL,
        passReqToCallback: true,
      },

      async (request :any, accessToken:any, refreshToken:any, profile:any, done:any) => {
        if (profile._json) {
          return done(null, profile);
        } else {
          return done(null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });


/** Google Authentication callback endpoint */
authRoutes.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

authRoutes.get("/auth/google/callback", passport.authenticate("google"), async(req:any, res:any) => {

    if(req.user === undefined){
        res.redirect(config.socialLogin.failedURL)
    } else {
        const { id, email, name, sub } = req.user._json;
        const userObj = {
            email,
            userName: sub,
            displayName: name,
            providerName: "google",
            emailVerified: true
        };

        const redirectURL = await processUserData(userObj).catch((error: any) => {
            res.redirect(config.socialLogin.failedURL)
        });
        res.redirect(String(redirectURL));
    }
})


export = authRoutes;
