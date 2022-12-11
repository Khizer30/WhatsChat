import { Group } from "@prisma/client" ;
// ...
import prisma from "config/prisma" ;
import type { LoginType, UserType } from "components/Interfaces" ;

// Fetch User
async function fetchUser(data: LoginType): Promise<UserType | null>
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
        gender: true,
        email: true
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
        gender: true,
        email: true
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

// Exports
export { fetchUser, fetchContacts, fetchGroup } ;