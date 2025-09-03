// src/server.js
const dotenv = require('dotenv');
const mongoose = require('mongoose');


// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = require('./app');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('ERRO: A variável de ambiente MONGO_URI não está definida.');
  process.exit(1); 
}

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado ao MongoDB com sucesso!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Não foi possível conectar ao MongoDB.');
    console.error(error);
    process.exit(1);
  }
};

startServer();