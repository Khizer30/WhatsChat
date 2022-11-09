import express from "express" ;
import cors from "cors" ;
import { Server } from "socket.io" ;
import { createServer } from "http" ;
import type { Express } from "express" ;

// Dot Env
import * as dotenv from "dotenv" ;
dotenv.config() ;

// Message Interface
interface MessageType
{
  seconds: number ;
  time: string ;
  sender: string ;
  text: string ;
}

// App
const app: Express = express() ;
const port: number = 8080 ;

// Middleware
app.use(cors()) ;

// HTTP Server
const httpServer = createServer(app) ;

// Socket
const io = new Server(httpServer, { cors: { origin: `${ process.env.ORIGIN }` } }) ;

// Stack
let stack: MessageType[] = [] ;

// Listen Connection
io.on("connection", (socket) =>
{
  // Listen Start
  socket.once("start", () =>
  {
    // Emit Updates
    socket.emit("updates", stack) ;
  })

  // Listen Message
  socket.on("message", (arg: MessageType) =>
  {
    stack.push(arg) ;

    // Emit Updates
    socket.emit("updates", stack) ;
  })
}) ;

// Listen
httpServer.listen(port, () =>
{
  console.log(`Server Started on Port ${ port }`) ;
})