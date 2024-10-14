import multer from "multer";
import { uploadCloud } from "../config/cloudinary.js";

export const uploadCloudFile = async (req, res) => {
  try {
    console.log("🚀 Iniciando proceso de subida de archivo a la nube");

    uploadCloud.single("file")(req, res, function (err) {
      if (err) {
        if (err instanceof multer.MulterError) {
          console.error(
            "❌ Error de Multer durante la subida del archivo:",
            err
          );
          return res.status(500).json({
            status: "error",
            message: "Error de Multer durante la subida del archivo",
          });
        } else {
          console.error(
            "❌ Error desconocido durante la subida del archivo:",
            err
          );
          return res.status(500).json({
            status: "error",
            message: "Error desconocido durante la subida del archivo",
          });
        }
      }

      if (!req.file) {
        console.error("❌ No se subió ningún archivo");
        return res.status(400).json({
          status: "error",
          message: "No se subió ningún archivo",
        });
      }

      console.log(
        "✅ Archivo subido correctamente a la nube:",
        req.file.filename || req.file.path
      );
      return res.status(200).json({
        status: "success",
        message: "Archivo subido correctamente a la nube",
        data: {
          uploaded_file: req.file.filename || req.file.path,
        },
      });
    });
  } catch (error) {
    console.error(
      "❌ Error inesperado durante la subida del archivo a la nube:",
      error
    );
    return res.status(500).json({
      status: "error",
      message: "Error inesperado durante la subida del archivo a la nube",
    });
  }
};
