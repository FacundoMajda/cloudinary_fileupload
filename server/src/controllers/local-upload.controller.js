import multer from "multer";
import { uploadLocal } from "../config/multer.js";

export const uploadLocalFile = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({
      status: "error",
      message: "No se subió ningún archivo",
    });
  }

  uploadLocal.single("file")(req, res, function (err) {
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

    return res.json({
      status: "success",
      message: "Archivo subido correctamente",
      data: {
        uploaded_file: req.file.filename,
      },
    });
  });
};

// export const uploadLocalFiles = async (req, res) => {
//   uploadLocal.array("files", 10)(req, res, function (err) {
//     // 'files' es el nombre del campo y 10 es el número máximo de archivos
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json({
//         status: "error",
//         message: "Error de Multer durante la subida de archivos",
//       });
//     } else if (err) {
//       return res.status(500).json({
//         status: "error",
//         message: "Error desconocido durante la subida de archivos",
//       });
//     }

//     if (!req.files || req.files.length === 0) {
//       console.log("❌ No se subieron archivos.");
//       return res.status(400).json({
//         status: "error",
//         message: "No se subieron archivos",
//       });
//     }

//     return res.json({
//       status: "success",
//       message: "Archivos subidos correctamente",
//       data: {
//         files: req.files.map((file) => file.filename),
//       },
//     });
//   });
// };
