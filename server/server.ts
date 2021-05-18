import express, { Request, Response } from "express";
import corsOption from "../middleware/cors";
import cors from 'cors'
import bodyParser from "body-parser";
import router from "../router/index";
import { createConnection, Connection } from "typeorm";
import "dotenv";


const app = express();

/* Connect to Mysql */

createConnection()
  .then(async (connection: Connection) =>
    console.log("Entity connected : ", connection.isConnected)
  )
  .catch((err) => {
    console.log("Entity conncetion error : ", err);
  });

/* set express setting */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* set cors */ 
app.use(cors(corsOption));

//router setup
app.use('/', router);

export default app;
