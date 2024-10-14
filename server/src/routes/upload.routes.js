import { Router } from "express";
import { uploadCloudFile } from "../controllers/cloud-upload.controller.js";
import { uploadLocalFile } from "../controllers/local-upload.controller.js";
import { validateFile } from "../middlewares/validate-file.middleware.js";

const router = Router();

router.post("/upload/local", validateFile, uploadLocalFile);
router.post("/upload/cloud", validateFile, uploadCloudFile);

export default router;
