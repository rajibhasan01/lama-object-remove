// External import
import express from "express";

// Internal import
import {lamaPhotoEdit } from "../../controllers/astria.Ai/controller.Astria.Ai";
import { fileUpload, fileWriteLocallyForLama } from "../../middlewares/common/fileUpload";
import { JwtAuthentication } from "../../middlewares/common/jwt.varification";

const authentication = JwtAuthentication.getInstance().authenticateUser;
const astriaAiRoute = express.Router();

// Server for lama
astriaAiRoute.post('/lama/photo-edit', fileUpload.fields([{name: 'imageFiles', maxCount: 2}]), fileWriteLocallyForLama, lamaPhotoEdit)

export = astriaAiRoute;

