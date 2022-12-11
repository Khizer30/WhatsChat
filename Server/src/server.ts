import express from "express" ;
import cors from "cors" ;
import { Server } from "socket.io" ;
import { createServer } from "http" ;
import type { Express } from "express" ;
import type { Message } from "@prisma/client" ;
// ...
import { addMessage, readMessages } from "./library" ;
import type { MessageType } from "./Interfaces" ;

// Dot Env
import * as dotenv from "dotenv" ;
dotenv.config() ;

// App
const app: Express = express() ;
const port: number = 8000 ;

// Middleware
app.use(cors()) ;

// HTTP Server
const httpServer = createServer(app) ;

// Socket IO
const io = new Server(httpServer, { cors: { origin: process.env.ORIGIN! } }) ;

// Listen Connection
io.on("connection", async (socket) =>
{
  // Listen Start
  socket.on("start", async (gid: number) =>
  {
    const messages: Message[] = await readMessages(gid) ;

    // Emit Updates
    socket.broadcast.emit("updates", messages) ;
  }) ;

  // Listen Message
  socket.on("message", async (message: MessageType) =>
  {
    const messages: Message[] = await addMessage(message) ;
  
    // Emit Updates
    socket.broadcast.emit("updates", messages) ;
  }) ;
}) ;

// Listen
httpServer.listen(port, () =>
{
  console.log(`Server Started on Port ${ port }`) ;
}) ;