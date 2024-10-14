import axios from "axios";

const handleUploadProgress = (
  uploadDuration,
  intervalDuration,
  setUploadProgress,
  onComplete
) => {
  console.log("📊 Iniciando manejo del progreso de la subida");
  const totalIntervals = uploadDuration / intervalDuration;
  let currentInterval = 0;

  const intervalId = setInterval(() => {
    currentInterval += 1;
    const progress = Math.round((currentInterval / totalIntervals) * 100);
    setUploadProgress(progress);
    console.log(`📊 Progreso de subida: ${progress}%`);

    if (currentInterval >= totalIntervals) {
      clearInterval(intervalId);
      console.log("📊 Progreso de subida completado");
      onComplete();
    }
  }, intervalDuration);
};

const uploadFileRequest = async (
  endpoint,
  formData,
  setUploadStatus,
  fileName
) => {
  console.log(`🚀 Enviando solicitud de subida a ${endpoint}`);
  try {
    const response = await axios.post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(`✅ Respuesta del servidor: ${response.status}`);
    setUploadStatus("success");
    console.log(`✅ Subida completada con éxito: ${fileName}`);
  } catch (error) {
    setUploadStatus("error");
    console.error(`❌ Error en la subida de: ${fileName}`, error);
  }
};

export const uploadFile = (
  file,
  isCloud,
  setUploadProgress,
  setUploadStatus
) => {
  const endpoint = isCloud
    ? "http://localhost:3000/api/upload/cloud"
    : "http://localhost:3000/api/upload/local";
  const formData = new FormData();
  formData.append("file", file);

  setUploadStatus("uploading");
  setUploadProgress(0);

  console.log(
    `🚀 Iniciando subida de ${file.name} a ${endpoint} (Para subir data en ${
      isCloud ? "Nube" : "Local"
    })`
  );

  const uploadDuration = 1000; // duracion de la subida en milisegundos
  const intervalDuration = 100; // intervealo de actualización en milisegundos

  handleUploadProgress(
    uploadDuration,
    intervalDuration,
    setUploadProgress,
    () => {
      console.log(
        "📊 Progreso de subida completado, iniciando solicitud de subida"
      );
      uploadFileRequest(endpoint, formData, setUploadStatus, file.name);
    }
  );
};
