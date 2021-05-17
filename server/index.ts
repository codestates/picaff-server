// basic server modules.
import express, { Request, Response } from "express";
// import { cors } from "../middleware/cors"; cors 미들웨어 작성 후 주석해제.
import bodyParser from "body-parser";
// typeorm
import { createConnection, Connection } from "typeorm";
// etc
import "dotenv";

// entity connction
createConnection()
  .then(async (connection: Connection) =>
    console.log("Entity connected : ", connection.isConnected)
  )
  .catch((err) => {
    console.log("Entity conncetion error : ", err);
  });

// create express server
const app = express();

//setting port
app.set("port", 3000);

const server = app.listen(app.get("port"), () => {
  console.log(`App is listening on PORT ${app.get("port")} `);
});

// 서버 내용 작성.
export default server;
