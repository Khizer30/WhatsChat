import { PrismaClient, User } from "@prisma/client" ;
// ...
import type { LoginType } from "components/Interfaces" ;

// Prisma
const prisma = new PrismaClient() ;

// Fetch User
async function fetchUser(data: LoginType): Promise<User | null>
{
  let user: User | null = null ;

  try
  {
    user = await prisma.user.findFirst({
      where:
      {
        email: data.email,
        password: data.password
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

  return user ;
}

// Exports
export default prisma ;
export { fetchUser } ;