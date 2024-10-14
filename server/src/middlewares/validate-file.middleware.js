export const validateFile = (req, res, next) => {
  try {
    const files = req.files || (req.file ? [req.file] : []);

    if (!files) {
      return res.status(400).json({
        status: "error",
        message: "No se subió ningún archivo",
      });
    }

    const allowedTypes = /jpeg|jpg|png|pdf|text|docx|csv|xlsx|txt/;
    const maxSize = 15 * 1024 * 1024; // 15 MB

    for (const file of files) {
      const extname = allowedTypes.test(file.mimetype.toLowerCase());
      if (!extname) {
        console.log("❌ Tipo de archivo inválido:", file.mimetype);
        return res.status(400).json({
          status: "error",
          message:
            "Tipo de archivo inválido. Solo se permiten PDF, TEXT, JPEG y PNG.",
        });
      }

      if (file.size > maxSize) {
        console.log("❌ El tamaño del archivo excede el límite:", file.size);
        return res.status(400).json({
          status: "error",
          message: "El tamaño del archivo excede el límite máximo de 15MB.",
        });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error en la validación del archivo",
    });
  }
};
