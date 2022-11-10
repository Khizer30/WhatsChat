import express from "express" ;
import cors from "cors" ;
import { Server } from "socket.io" ;
import { createServer } from "http" ;
import type { Express } from "express" ;
import type { Message } from "@prisma/client" ;
// ...
import { addMessage, readMessages } from "./lib/prisma" ;

// Dot Env
import * as dotenv from "dotenv" ;
dotenv.config() ;

// App
const app: Express = express() ;
const port: number = 8080 ;

// Middleware
app.use(cors()) ;

// HTTP Server
const httpServer = createServer(app) ;

// Socket IO
const io = new Server(httpServer, { cors: { origin: process.env.ORIGIN! } }) ;

// Stack
let stack: Message[] = [] ;

// Listen Connection
io.on("connection", (socket) =>
{
  // Listen Start
  socket.once("start", async (group: number) =>
  {
    stack = await readMessages(group) ;

    // Emit Updates
    socket.emit("updates", stack) ;
  })

  // Listen Message
  socket.on("message", async (message: Message) =>
  {
    await addMessage(message) ;
    stack = await readMessages(message.gid) ;

    // Emit Updates
    socket.emit("updates", stack) ;
  })
}) ;

// Listen
httpServer.listen(port, () =>
{
  console.log(`Server Started on Port ${ port }`) ;
})