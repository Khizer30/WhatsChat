import Head from "next/head" ;
import Image from "next/image" ;
import Link from "next/link" ;
import { useState, useEffect } from "react" ;
import { useRouter } from "next/router" ;
import { useSession } from "next-auth/react" ;
import io from "socket.io-client" ;
import type { NextRouter } from "next/router" ;
// ...
import Message from "components/Message" ;
import type { MessageType, UserType } from "components/Interfaces" ;
import styles from "styles/chat.module.css" ;
import receiverImg from "images/avatar_2.webp" ;

// Chat
function Chat(): JSX.Element
{
  // Variables
  const { data, status } = useSession() ;
  const [user, setUser] = useState<UserType | null>(null) ;
  const [receiver, setReceiver] = useState<UserType | null>(null) ;
  const [loading, setLoading] = useState<boolean>(true) ;
  const [text, setText] = useState<string>("") ;
  const [messages, setMessages] = useState<MessageType[]>([]) ;
  const router: NextRouter = useRouter() ;
  const { gid } = router.query ;
  const socket = io(process.env.NEXT_PUBLIC_URL!) ;

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
        socket.on("updates", (args: MessageType[]) =>
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
  function messageMapper(x: MessageType): JSX.Element
  {
    return (
      <Message key={ x.mid } uid={ x.uid } time={ x.time } text={ x.text } />
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
        time: time,
        text: text.trim()
      } ;

      // Emit Message
      socket.emit("message", message) ;

      // Reset
      setText("") ;
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
      <title> Chat | WhatsChat </title>

      <meta name="description" content="WhatsChat Chat" />
      <meta name="keywords" content="WhatsChat, Chat" />
    </Head>

    <div className={ "container-fluid d-flex justify-content-between align-items-center " + styles.chatNav }>
      <div className="d-flex justify-content-center align-items-center">

        <Link href="/dashboard" className={ styles.chatLink }>
          <i className="fas fa-chevron-circle-left"></i>
        </Link>

        <p className={ styles.chatName }> { receiver?.name } </p>
      </div>
      <Image
        src={ receiverImg }
        alt="Avatar"
        draggable="false"
        placeholder="empty"
        priority
        className={ "scale " + styles.chatNavImg }
      />
    </div>

    <div className={ "container-fluid d-flex flex-column justify-content-end align-items-center justify-content-sm-end " + styles.messageDiv }>
    {
      messages.map(messageMapper)
    }
    </div>

    <div className={ "container-fluid d-flex justify-content-center align-items-center " + styles.inputDiv }>
      <form method="post" target="_self" encType="application/x-www-form-urlencoded" className="d-flex justify-content-center align-items-center width95"
      onSubmit={ handleSubmit } autoComplete="off" noValidate>
        
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
          className={ "d-flex justify-content-center align-items-center form-control " + styles.txtInput }
        />

        <button onClick={ send } type="button" className={ "d-flex justify-content-center align-items-center " + styles.inputBtn }>
          <i className={ "fas fa-play " + styles.btnIcon }></i>
        </button>

      </form>
    </div>
  </>
  )
}

// Export Chat
export default Chat ;