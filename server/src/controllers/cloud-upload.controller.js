import multer from "multer";
import { uploadCloud } from "../config/cloudinary.js";

export const uploadCloudFile = async (req, res) => {
  uploadCloud.single("file")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({
        status: "error",
        message: "Error de Multer durante la subida del archivo",
      });
    } else if (err) {
      return res.status(500).json({
        status: "error",
        message: "Error desconocido durante la subida del archivo",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "No se subió ningún archivo",
      });
    }

    return res.json({
      status: "success",
      message: "Archivo subido correctamente",
      data: {
        uploaded_file: req.file.filename || req.file.path,
      },
    });
  });
};
