import { PrismaClient } from "@prisma/client" ;
import type { Message } from "@prisma/client" ;

// Prisma
const prisma = new PrismaClient() ;

// Add Message
async function addMessage(x: Message): Promise<void>
{
  try
  {
    await prisma.message.create({
      data:
      {
        gid: x.gid,
        time: x.time,
        sender: x.sender,
        text: x.text
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
}

// Read Messages
async function readMessages(group: number): Promise<Message[]>
{
  let messages: Message[] = [] ;

  try
  {
    messages = await prisma.message.findMany({
      where:
      {
        gid: group
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