import express, { Request, Response } from "express";
import corsOption from "../middleware/cors";
import cors from "cors";
import { userRouter } from "../router/index";
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

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello world");
  console.log("Hello world");
});

//router setup
app.use("/user", userRouter);

export default app;
