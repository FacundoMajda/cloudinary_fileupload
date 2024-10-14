import axios from "axios";

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

  const uploadDuration = 1000; // Duración de la subida en milisegundos
  const intervalDuration = 100; // Intervalo de actualización en milisegundos
  const totalIntervals = uploadDuration / intervalDuration;
  let currentInterval = 0;

  const intervalId = setInterval(() => {
    currentInterval += 1;
    const progress = Math.round((currentInterval / totalIntervals) * 100);
    setUploadProgress(progress);
    console.log(`📊 Progreso de subida: ${progress}%`);

    if (currentInterval >= totalIntervals) {
      clearInterval(intervalId);
      axios
        .post(endpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          setUploadStatus("success");
          console.log(`✅ Subida completada con éxito: ${file.name}`);
        })
        .catch(() => {
          setUploadStatus("error");
          console.log(`❌ Error en la subida de: ${file.name}`);
        });
    }
  }, intervalDuration);
};
