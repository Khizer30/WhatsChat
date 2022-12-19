import Head from "next/head" ;
import { useState, useEffect } from "react" ;
import { useRouter } from "next/router" ;
import { useSession, signOut } from "next-auth/react" ;
import type { NextRouter } from "next/router" ;
// ...
import { fetchContacts } from "components/Prisma" ;
import { fetchPost } from "components/Library" ;
import type { UserType, GroupReqType, ResType } from "components/Interfaces" ;

// Props
interface Props
{
  contacts: UserType[] ;
}

// SSR
export async function getServerSideProps() 
{
  const contacts: UserType[] = await fetchContacts() ;

  return { props: { contacts } } ;
}

// Dashboard
function Dashboard({ contacts }: Props): JSX.Element
{
  // Variables
  const { data, status } = useSession() ;
  const [user, setUser] = useState<UserType | null>(null) ;
  const [loading, setLoading] = useState<boolean>(true) ;
  const router: NextRouter = useRouter() ;

  // Redirect
  useEffect(() =>
  {
    if (status === "unauthenticated")
    {
      router.replace("/auth/login") ;
    }
    else if (status === "authenticated")
    {
      if (data?.user?.name)
      {
        sessionStorage.clear() ;
        
        setUser(JSON.parse(data.user.name)) ;
        setLoading(false) ;
      }
    }
  }, [status]) ;

  // Log Out
  async function logOut(): Promise<void>
  {
    await signOut({ redirect: false, callbackUrl: "/auth/login" }) ;
  }

  // Start Chat
  async function startChat(receiver: UserType): Promise<void>
  {
    if (user)
    {
      const groupData: GroupReqType =
      {
        sender: user.uid,
        receiver: receiver.uid
      } ;
  
      const res: ResType = await fetchPost("/api/group", groupData) ;
      const gid: string = res.message ;

      sessionStorage.setItem("receiver", JSON.stringify(receiver)) ;
  
      router.push(`/chat/${ gid }`) ;
    }
  }

  // Contacts Mapper
  function contactsMapper(x: UserType): JSX.Element
  {
    return (
      <button type="button" key={ x.uid } onClick={ () => startChat(x) } > { x.name } </button>
    )
  }

  // Filter User
  function filterUser(x: UserType): boolean
  {
    if (user)
    {
      if (user.uid === x.uid)
      {
        return false ;
      }
      else
      {
        return true ;
      }
    }
    else
    {
      return false ;
    }
  }

  // Loading Screen
  if (loading)
  {
    return (
    <>
      <Head>
        <title> Redirect </title>

        <meta name="description" content="WhatsChat Redirect" />
        <meta name="keywords" content="WhatsChat, Redirect" />
      </Head>

      <h1 style={{ color: "white" }}> Loading... </h1>
    </>
    )
  }

  return (
  <>
    <Head>
      <title> Dashboard | WhatsChat </title>

      <meta name="description" content="WhatsChat Dashboard" />
      <meta name="keywords" content="WhatsChat, Dashboard" />
    </Head>

    <button type="button" onClick={ logOut }> Sign Out </button>
    <br /> <br />

    {
      contacts.filter(filterUser).map(contactsMapper)
    }
  </>
  )
}

// Export Dashboard
export default Dashboard ;