import Head from "next/head" ;
import Link from "next/link" ;
import Image from "next/image" ;
import { useState, useEffect } from "react" ;
import { useRouter } from "next/router" ;
import { useSession, signOut } from "next-auth/react" ;
import type { NextRouter } from "next/router" ;
// ...
import LoadingIcon from "components/LoadingIcon" ;
import { fetchContacts } from "components/Prisma" ;
import { fetchPost } from "components/Library" ;
import type { UserType, GroupReqType, ResType } from "components/Interfaces" ;
import styles from "styles/dashboard.module.css" ;
import avatars from "components/Avatars" ;
import logo from "images/logo_white.svg" ;

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
      <div key={ x.uid } className="col d-flex justify-content-center align-items-center">
        <div onClick={ () => startChat(x) } className={ "d-flex flex-column justify-content-evenly align-items-center " + styles.userDiv }>
          <Image
            src={ avatars[x.image] }
            alt="User Avatar"
            draggable="false"
            placeholder="empty"
            priority
            className={ styles.userImg }
          />
          <p className={ styles.userP }> { x.name } </p>
        </div>
      </div>
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

      <LoadingIcon />
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

    <nav className={ "navbar navbar-light navbar-expand " + styles.navBar }>
      <div className="navbar-brand pad0">
        <Image
          src={ logo }
          alt="Logo"
          draggable="false"
          placeholder="empty"
          priority
          className={ styles.navBarLogo }
        />
      </div>
      
      <button data-bs-toggle="collapse" data-bs-target="#navCol" className="navbar-toggler">
        <span className="visually-hidden"> Toggle Navigation </span>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div id="navCol" className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <div onClick={ logOut } title="Log Out" className="nav-link">
            <Image
              src={ (user?.image) ? avatars[user.image] : avatars[0] }
              alt="User Avatar"
              draggable="false"
              placeholder="empty"
              priority
              className={ "scale " + styles.navBarUserImg }
            />
          </div>
        </ul>
      </div>
    </nav>

    <div className={ "container-fluid d-flex flex-column justify-content-center align-items-center " + styles.mainContainer }>
      <div className="row">
    {
      contacts.filter(filterUser).map(contactsMapper)
    }
      </div>
    </div>

    <footer className="d-flex d-sm-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center">
      <p className="footerP"> @WhatsChat </p>
    </footer>
  </>
  )
}

// Export Dashboard
export default Dashboard ;