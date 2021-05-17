// basic server modules.
import express, { Request, Response } from "express";
import corsOption from "../middleware/cors";
import cors from 'cors'
import bodyParser from "body-parser";
import router from "../router/index";
// typeorm
import { createConnection, Connection } from "typeorm";
// etc
import "dotenv";
import app from "./server"

// entity connction
// createConnection()
//   .then(async (connection: Connection) =>
//     console.log("Entity connected : ", connection.isConnected)
//   )
//   .catch((err) => {
//     console.log("Entity conncetion error : ", err);
//   });

// create express server
// const app = express();

// app.use(cors(corsOption));

// //router setup
// app.use('/', router);

//setting port
app.set("port", 3306);
const server = app.listen(app.get("port"), () => {
  console.log(`App is listening on PORT ${app.get("port")} `);
});

// 서버 내용 작성.
// export default server;
