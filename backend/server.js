require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Usa a variável DATABASE_URL para conexão com o MongoDB
const mongoUri = process.env.DATABASE_URL || process.env.MONGO_URI;

// Evita múltiplas conexões ao MongoDB no Vercel (importante para Serverless)
let isConnected = false;
async function connectToMongoDB() {
  if (isConnected) return;
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
  console.log("MongoDB conectado");
}
connectToMongoDB().catch((err) =>
  console.error("Erro ao conectar no MongoDB:", err)
);

// Middleware
app.use(express.json());

// Rotas
const usersRouter = require("./routes/userRoutes");
app.use("/organize/user", usersRouter);

// Exporta o app para uso pelo Vercel
module.exports = app;
