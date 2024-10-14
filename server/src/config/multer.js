import multer, { diskStorage } from "multer";
import path from "path";
import fs from "fs";

const UPLOADS_DIR = "./src/uploads/";
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

const local_storage = diskStorage({
  destination: UPLOADS_DIR,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${crypto.randomUUID().toString()}${ext}`);
  },
});

const uploadLocal = multer({ storage: local_storage });
export { uploadLocal };
