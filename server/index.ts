import app from './server'
import 'dotenv/config'
import fs from 'fs'
import https from 'https'

const HTTPS_PORT = process.env.HTTPS_PORT || 4000

if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8')
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8')
  const credentials = { key: privateKey, cert: certificate }
  console.log(privateKey)
  console.log(certificate)
  const server = https.createServer(credentials, app)
  server.listen(HTTPS_PORT, () => console.log('server runnning'))
} else {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8')
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8')
  const credentials = { key: privateKey, cert: certificate }
  // const server = app.listen(HTTPS_PORT)
  const server = https.createServer(credentials, app)
  server.listen(HTTPS_PORT, () => console.log('server running ::: pems are in the same folder!'))
}
