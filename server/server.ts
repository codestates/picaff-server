import express, { Request, Response } from 'express'
import corsOption from '@middleware/cors'
import cors from 'cors'
<<<<<<< HEAD
import { userRouter, itemRouter } from '../router/index'
=======
import { userRouter, itemRouter, testRouter } from '../router/index'
>>>>>>> 737c6dd4facf00e9fad9aae26a37102ca8a2d2df
import { createConnection, Connection } from 'typeorm'
import 'dotenv'

const app = express()

/* Connect to Mysql */

createConnection()
  .then(async (connection: Connection) =>
    console.log('Entity connected : ', connection.isConnected)
  )
  .catch((err) => {
    console.log('Entity conncetion error : ', err)
  })

/* set express setting */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* set cors */
app.use(cors(corsOption))

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello world')
  console.log('Hello world')
})

//router setup
<<<<<<< HEAD
app.use('/user', userRouter) // user/signup
app.use('/item', itemRouter)
=======
app.use('/user', userRouter)
app.use('/item', itemRouter)
app.use('/test', testRouter)
>>>>>>> 737c6dd4facf00e9fad9aae26a37102ca8a2d2df

export default app
