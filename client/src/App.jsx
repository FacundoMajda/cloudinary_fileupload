import { useState } from "react";
import { CheckCircle, Cloud, Upload, XCircle } from "lucide-react";
import FileUploadButton from "./components/FileUploadButton";
import ProgressBar from "./components/ProgressBar";
import { uploadFile } from "./services/upload.service";
import { UPLOAD_STATUS } from "./constants/constants.js";

function App() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(UPLOAD_STATUS.IDLE);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event, isCloud) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      uploadFile(file, isCloud, setUploadProgress, setUploadStatus);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Subida de Archivos
        </h1>
        <div className="space-y-6">
          <FileUploadButton
            icon={<Upload className="w-5 h-5 mr-2" />}
            label="Subida Local"
            onChange={(e) => handleFileChange(e, false)}
          />
          <FileUploadButton
            icon={<Cloud className="w-5 h-5 mr-2" />}
            label="Subida en Nube"
            onChange={(e) => handleFileChange(e, true)}
          />
          {uploadStatus === UPLOAD_STATUS.UPLOADING && (
            <>
              <ProgressBar progress={uploadProgress} />
              <p className="text-center text-gray-600">
                Subiendo: {selectedFile?.name}
              </p>
            </>
          )}
          {uploadStatus === UPLOAD_STATUS.SUCCESS && (
            <div className="flex items-center justify-center text-green-500">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>¡Subida completada con éxito!</span>
            </div>
          )}
          {uploadStatus === UPLOAD_STATUS.ERROR && (
            <div className="flex items-center justify-center text-red-500">
              <XCircle className="w-5 h-5 mr-2" />
              <span>Error en la subida. Intente nuevamente.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
