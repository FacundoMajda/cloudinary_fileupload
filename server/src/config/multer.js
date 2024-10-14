import multer, { diskStorage } from "multer";
import path from "path";
import fs from "fs";

const UPLOADS_DIR = "./src/uploads/";
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

const storage = diskStorage({
  destination: UPLOADS_DIR,
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const uploadLocal = multer({ storage: storage });
export { uploadLocal };
