import express from "express";
import cors from "cors";
import mongo from "mongodb";
import dotenv from "dotenv";
import winston from "winston";
import { listaEstados, mensagemFiltro } from "./helpers.js";

// Gera um logger de acesso formatado
const logger = (() => {
  const { combine, timestamp, printf } = winston.format;
  const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  });
  return winston.createLogger({
    format: combine(timestamp(), myFormat),
    transports: [new winston.transports.File({ filename: "log.log" })],
  });
})();

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.set("json spaces", 2);

// Rota para acessar os dados de todas as escolas de um estado
app.get("/apiNotasEnem/:ano/estado/:estado", async (req, res) => {
  try {
    const db = app.locals.db;
    const estado = req.params.estado.toUpperCase();
    const ano = req.params.ano;
    logger.info(`GET estado ${estado} em ${ano}`);
    if (listaEstados.includes(estado)) {
      const cursor = await db
        .collection(ano)
        .find({ estado }, { projection: { _id: 0 } });
      if (await cursor.count()) {
        const escolas = await cursor.toArray();
        const data = {
          encontrado: true,
          ano,
          estado,
          registros: escolas.length,
          escolas,
          mensagem: mensagemFiltro,
        };
        res.send(data);
      } else {
        res.send({
          encontrado: false,
          mensagem: "Nenhum registro encontrado para o ano selecionado",
        });
      }
    } else {
      res.send({
        encontrado: false,
        mensagem: "Sigla inválida para o estado",
      });
    }
  } catch (error) {
    console.log(error);
    res.send("Ocorreu um erro, tente novamente mais tarde");
  }
});

// Rota para acessar os dados de uma escola pelo Codigo INEP
app.get("/apiNotasEnem/:ano/:codInep", async (req, res) => {
  try {
    const db = app.locals.db;
    const codInep = parseInt(req.params.codInep);
    const ano = req.params.ano;
    logger.info(`GET escola ${codInep} em ${ano}`);
    if (codInep) {
      await db
        .collection(ano)
        .findOne({ codInep }, { projection: { _id: 0 } }, (err, data) => {
          if (data) {
            data = {
              encontrado: true,
              ano: ano,
              escola: { ...data },
              mensagem: mensagemFiltro,
            };
            res.send(data);
          } else {
            res.send({
              encontrado: false,
              mensagem: "Código INEP não encontrado",
            });
          }
        });
    } else {
      res.send({
        encontrado: false,
        mensagem: "Código INEP inválido, deve conter 8 dígitos",
      });
    }
  } catch (error) {
    console.log(error);
    res.send("Ocorreu um erro, tente novamente mais tarde");
  }
});

try {
  mongo.connect(
    MONGO_URL,
    { promiseLibrary: Promise, useUnifiedTopology: true },
    (err, client) => {
      app.locals.db = client.db("apiNotasEnem");
      app.listen(PORT, () => {
        console.log(`API started on port ${PORT} with mongo connected.`);
        if (err) {
          client.close();
          throw err;
        }
      });
    }
  );
} catch (err) {
  console.log(err);
}
