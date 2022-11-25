import { useState, useEffect } from "react" ;
import { useRouter } from "next/router" ;
import { useSession, signOut } from "next-auth/react" ;
import type { NextRouter } from "next/router" ;
// ...
import { fetchContacts } from "components/Prisma" ;
import type { UserType } from "components/Interfaces" ;

// Props
interface Props
{
  allContacts: UserType[] ;
}

// SSR
export async function getServerSideProps() 
{
  const allContacts: UserType[] = await fetchContacts() ;

  return { props: { allContacts } } ;
}

// Dashboard
function Dashboard({ allContacts }: Props): JSX.Element
{
  // Variables
  const { data, status } = useSession() ;
  const [user, setUser] = useState<UserType | null>(null) ;
  const [contacts, setContacts] = useState<UserType[]>(allContacts) ;
  const router: NextRouter = useRouter() ;

  // Set User
  useEffect(() =>
  {
    if (data?.user?.name)
    {
      setUser(JSON.parse(data.user.name)) ;
    }
  }, [status]) ;

  // Redirect
  if (status === "loading")
  {
    return (
    <>
      <h1> Loading... </h1>
    </>
    )
  }
  else if (status === "unauthenticated")
  {
    router.replace("/auth/login") ;

    return <></>
  }

  // Log Out
  async function logOut(): Promise<void>
  {
    await signOut({ redirect: false, callbackUrl: "/auth/login" }) ;
  }

  // Start Chat
  function startChat(uid: number): void
  {
    console.log(uid) ;
  }

  // Contacts Mapper
  function contactsMapper(x: UserType): JSX.Element
  {
    return (
      <button onClick={ () => startChat(x.uid) } key={ x.uid } type="button"> { x.name } </button>
    )
  }

  // Filter User
  function filterUser(x: UserType): boolean
  {
    if (user?.uid === x.uid)
    {
      return false ;
    }
    else
    {
      return true ;
    }
  }

  return (
  <>
    <button onClick={ logOut } type="button"> Sign Out </button>
    <br /> <br />

    {
      contacts.filter(filterUser).map(contactsMapper)
    }
  </>
  )
}

// Export Dashboard
export default Dashboard ;