import type { Message } from "@prisma/client" ;
// ...
import prisma from "./prisma" ;
import type { MessageType } from "./Interfaces" ;

// Add Message
async function addMessage(x: MessageType): Promise<Message[]>
{
  let messages: Message[] = [] ;

  try
  {
    await prisma.message.create({
      data:
      {
        gid: x.gid,
        uid: x.uid,
        image: x.image,
        time: x.time,
        text: x.text
      }
    }) ;

    messages = await prisma.message.findMany({
      where:
      {
        gid: x.gid
      }
    }) ;
  }
  catch(err: unknown)
  {
    console.log(err) ;
  }
  finally
  {
    await prisma.$disconnect() ;
  }

  return messages ;
}

// Read Messages
async function readMessages(gid: number): Promise<Message[]>
{
  let messages: Message[] = [] ;

  try
  {
    messages = await prisma.message.findMany({
      where:
      {
        gid: gid
      }
    }) ;
  }
  catch(err: unknown)
  {
    console.log(err) ;
  }
  finally
  {
    await prisma.$disconnect() ;
  }

  return messages ;
}

// Exports
export { addMessage, readMessages } ;