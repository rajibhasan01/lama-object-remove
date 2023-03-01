// External import
import express from "express";

// Internal import
import loginRoute from "./login/route.login";
import astriaAiRoute from "./astria.ai/route.astria.ai";
import { JwtAuthentication } from "../middlewares/common/jwt.varification";
import authRoutes from "./login/route.social-login";

// Create a new router object
const registeredRouters = express.Router();

const jwt = JwtAuthentication.getInstance();

registeredRouters.use("/auth", loginRoute);
registeredRouters.use("/login", authRoutes);
registeredRouters.use("/braincraft-ai", astriaAiRoute);


export = registeredRouters;