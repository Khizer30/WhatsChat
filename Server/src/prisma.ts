import { PrismaClient } from "@prisma/client" ;
// ...
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
        group: x.group,
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
async function readMessages(gid: number): Promise<Message[]>
{
  let messages: Message[] = [] ;

  try
  {
    messages = await prisma.message.findMany({
      where:
      {
        group: gid
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