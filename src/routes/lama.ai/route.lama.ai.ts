// External import
import express from "express";

// Internal import
import {lamaPhotoEdit } from "../../controllers/lama.ai/controller.Lama.Ai";
import { fileUpload, fileWriteLocallyForLama } from "../../middlewares/common/fileUpload";
import { JwtAuthentication } from "../../middlewares/common/jwt.varification";

const authentication = JwtAuthentication.getInstance().authenticateUser;
const lamaAiRoute = express.Router();

// Server for lama
lamaAiRoute.post('/lama/photo-edit', fileUpload.fields([{name: 'imageFiles', maxCount: 2}]), fileWriteLocallyForLama, lamaPhotoEdit)

export = lamaAiRoute;

