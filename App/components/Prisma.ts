import type { User, Group } from "@prisma/client" ;
// ...
import prisma from "config/prisma" ;
import type { LogInType, UserType, SignUpReqType } from "components/Interfaces" ;

// Fetch User
async function fetchUser(data: LogInType): Promise<UserType | null>
{
  let user: UserType | null = null ;

  try
  {
    user = await prisma.user.findFirst({
      where:
      {
        email: data.email,
        password: data.password
      },
      select:
      {
        uid: true,
        name: true,
        email: true,
        password: false,
        image: true,
        groups: false,
        messages: false
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

// Fetch Contacts
async function fetchContacts(): Promise<UserType[]>
{
  let contacts: UserType[] = [] ;

  try
  {
    contacts = await prisma.user.findMany({
      select:
      {
        uid: true,
        name: true,
        email: true,
        password: false,
        image: true,
        groups: false,
        messages: false
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

  return contacts ;
}

// Fetch Group
async function fetchGroup(sender: number, reciever: number): Promise<number>
{
  let group: Group = { gid: 0 } ;

  try
  {
    let tempGroup: Group | null = null ;

    // Find Group
    tempGroup = await prisma.group.findFirst({
      where:
      {
        AND:
        [
          {
            users:
            {
              some: { uid: sender }
            }
          },
          {
            users:
            {
              some: { uid: reciever }
            }
          }
        ]
      }
    }) ;

    // Create Group
    if (!tempGroup)
    {
      tempGroup = await prisma.group.create({
        data:
        {
          users:
          {
            connect:
            [
              { uid: sender },
              { uid: reciever }
            ]
          }
        }
      }) ;
    }

    group = tempGroup ;
  }
  catch(err: unknown)
  {
    console.log(err) ;
  }
  finally
  {
    await prisma.$disconnect() ;
  }

  return group.gid ;
}

// Create User
async function createUser(data: SignUpReqType): Promise<User | null>
{
  let user: User | null = null ;

  try
  {
    user = await prisma.user.create({
      data:
      {
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.image
      }
    }) ;
  }
  catch (err: unknown)
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
export { fetchUser, fetchContacts, fetchGroup, createUser } ;