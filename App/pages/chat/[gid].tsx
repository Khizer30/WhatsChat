import Head from "next/head" ;
import Image from "next/image" ;
import Link from "next/link" ;
import { useState, useEffect, useRef } from "react" ;
import { useRouter } from "next/router" ;
import { useSession } from "next-auth/react" ;
import io from "socket.io-client" ;
import type { Message } from "@prisma/client" ;
import type { NextRouter } from "next/router" ;
// ...
import LoadingIcon from "components/LoadingIcon" ;
import MessageBox from "components/MessageBox" ;
import type { MessageType, UserType } from "components/Interfaces" ;
import styles from "styles/chat.module.css" ;
import avatars from "components/Avatars" ;
import homeIcon from "images/home.svg" ;
import sendIcon from "images/send.svg" ;

// Chat
function Chat(): JSX.Element
{
  // Variables
  const { data, status } = useSession() ;
  const [user, setUser] = useState<UserType | null>(null) ;
  const [receiver, setReceiver] = useState<UserType | null>(null) ;
  const [loading, setLoading] = useState<boolean>(true) ;
  const [text, setText] = useState<string>("") ;
  const [messages, setMessages] = useState<Message[]>([]) ;
  const spanElement = useRef<HTMLSpanElement | undefined>(undefined) ;
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!) ;
  const router: NextRouter = useRouter() ;
  const { gid } = router.query ;

  // Redirect
  useEffect(() =>
  {
    if (status === "unauthenticated")
    {
      router.replace("/auth/login") ;
    }
    else if (status === "authenticated")
    {
      const sessionData: string | null = sessionStorage.getItem("receiver") ;

      if (data?.user?.name && sessionData)
      {
        // WebSocket Listen Updates
        socket.on("updates", (args: Message[]) =>
        {
          setMessages(args) ;
        }) ;

        setUser(JSON.parse(data.user.name)) ;
        setReceiver(JSON.parse(sessionData)) ;
        setLoading(false) ;
      }
    }

    return () =>
    {
      socket.off("updates") ;
    } ;
  }, [status]) ;

  // Start WebSockets
  useEffect(() =>
  {
    if (gid && !loading)
    {
      socket.emit("start", +gid) ;
    }
  }, [loading]) ;

  // Handle Change
  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void
  {
    setText(event.target.value) ;
  }

  // Handle Submit
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void
  {
    event.preventDefault() ;
    send() ;
  }

  // Message Mapper
  function messageMapper(x: Message): JSX.Element
  {
    return (
      <MessageBox key={ x.mid } { ...x } />
    )
  }

  // Send
  function send(): void
  {
    if ((text !== "") && (text.trim().length <= 100) && user && gid)
    {
      let tempDate: Date = new Date() ;
      let temp: number = 0 ;

      temp = tempDate.getHours() ;
      let hours: string = (temp < 10) ? `0${ temp }` : `${ temp }` ;

      temp = tempDate.getMinutes() ;
      let minutes: string = (temp < 10) ? `0${ temp }` : `${ temp }` ;

      const time: string = `${ hours }:${ minutes }` ;

      const message: MessageType =
      {
        gid: +gid,
        uid: user.uid,
        image: user.image,
        time: time,
        text: text.trim()
      } ;

      // Emit Message
      socket.emit("message", message) ;

      setText("") ;

      if (spanElement.current)
      {
        spanElement.current.scrollIntoView() ;
      }
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
      <title> Chat | WhatsChat </title>

      <meta name="description" content="WhatsChat Chat" />
      <meta name="keywords" content="WhatsChat, Chat" />
    </Head>

    <nav className={ "navbar navbar-light navbar-expand sticky-top d-flex justify-content-between align-items-center " + styles.navBar }>
      <div className="container-fluid">
        <div className="d-flex justify-content-center align-items-center">
          
          <Link href="/dashboard">
            <Image
              src={ homeIcon }
              alt="Home Icon"
              draggable="false"
              placeholder="empty"
              priority
              className={ "scale" }
            />
          </Link>

          <h1 className={ styles.navBarH }> { (receiver?.name) ? receiver.name : "" } </h1>
        </div>

        <Image
          src={ (receiver?.image) ? avatars[receiver.image] : avatars[0] }
          alt="Avatar"
          draggable="false"
          placeholder="empty"
          priority
          className={ "scale " + styles.navBarImg }
        />
      </div>
    </nav>

    <div className={ "container-fluid d-flex flex-column justify-content-end align-items-center justify-content-sm-end " + styles.chatContainer }>
    {
      messages.map(messageMapper)
    }
    <span ref={ spanElement } className={ styles.spanElement } />
    </div>

    <nav className={ "navbar navbar-light navbar-expand fixed-bottom d-flex justify-content-center align-items-center " + styles.inputDiv }>
      <div className="container-fluid">
        <form method="post" target="_self" encType="application/x-www-form-urlencoded" className="d-flex justify-content-evenly align-items-center w-100"
        onSubmit={ handleSubmit } autoComplete="off">

          <input 
            name="text"
            type="text"
            value={ text }
            onChange={ handleChange }
            maxLength={ 100 }
            minLength={ 0 }
            placeholder="Type Message Here..."
            autoFocus
            required
            className={ "form-control " + styles.inputText }
          />

          <button type="button" onClick={ send } className={ "d-flex justify-content-center align-items-center " + styles.inputBtn }>
            <Image
              src={ sendIcon }
              alt="Send Icon"
              draggable="false"
              placeholder="empty"
              priority
            />
          </button>

        </form>
      </div>
    </nav>
  </>
  )
}

// Export Chat
export default Chat ;