import cors from "cors";
import express from "express";
import morgan from "morgan";
import router from "./src/routes/upload.routes.js";

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "http://localhost:4000",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  })
);

app.use("/api", router);

app.use("/", (req, res) => {
  console.log("📥 Solicitud recibida en la ruta raíz");
  res.send("Hola Mundo!");
});

app.use((req, res) => {
  console.log("⚠️ Ruta no encontrada");
  res.status(404).send("404 - No encontrado");
});

app.listen(PORT, async () => {
  console.log("🔄 Iniciando servidor...");
  console.log(`✅ Servidor ejecutándose en puerto: ${PORT}`);
});
