import { Router } from "express";
import { uploadCloudFile } from "../controllers/cloud-upload.controller.js";
import { uploadLocalFile } from "../controllers/local-upload.controller.js";

const router = Router();

router.post("/upload/local", uploadLocalFile);
router.post("/upload/cloud", uploadCloudFile);

export default router;
