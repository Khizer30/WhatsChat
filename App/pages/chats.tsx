import { useState, useEffect } from "react" ;
import Head from "next/head" ;
import Image from "next/image" ;
import Link from "next/link" ;
import { io } from "socket.io-client" ;
// ...
import styles from "../styles/chats.module.css" ;
import Message from "../components/Message" ;
import receiver from "../public/images/avatar_3.webp" ;
import type { MessageType } from "../components/Interfaces" ;

// Chats
function Chats(): JSX.Element
{
  // Variables
  const socket = io(process.env.NEXT_PUBLIC_URL!) ;
  const [text, setText] = useState<string>("") ;
  const [stack, setStack] = useState<MessageType[]>([]) ;

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
  function messageMapper(x: MessageType, i: number): JSX.Element
  {
    return (
      <Message key={ i } seconds={ x.seconds } time={ x.time } sender={ x.sender } text={ x.text } />
    )
  }

  // Start
  useEffect(() =>
  {
    socket.emit("start") ;
  }, []) ;

  // Listen Updates
  socket.on("updates", (args: MessageType[]) =>
  {
    setStack(args) ;
  })

  // Send
  function send(): void
  {
    if (text !== "" && text.length <= 100)
    {
      let tempDate: Date = new Date() ;
      let temp: number = 0 ;

      let seconds: number = tempDate.getMilliseconds() ;

      temp = tempDate.getHours() ;
      let hours: string = (temp < 10) ? `0${ temp }` : `${ temp }` ;

      temp = tempDate.getMinutes() ;
      let minutes: string = (temp < 10) ? `0${ temp }` : `${ temp }` ;

      let time: string = `${ hours }:${ minutes }` ;

      let message: MessageType =
      {
        seconds: seconds,
        time: time,
        sender: "Ashhad",
        text: text
      } ;

      // Emit Message
      socket.emit("message", message) ;

      // Reset
      setText("") ;
    }
  }

  return (
  <>
    <Head>
      <title> Chats </title>

      <meta name="description" content="Chats" />
      <meta name="keywords" content="Chats" />
    </Head>

    <div className={ "container-fluid d-flex justify-content-between align-items-center " + styles.chatNav }>
      <div className="d-flex justify-content-center align-items-center">

        <Link href="/" className={ styles.chatLink }>
          <i className="fas fa-chevron-circle-left"></i>
        </Link>

        <p className={ styles.chatName }> Syed Muhammad Khizer </p>
      </div>
      <Image
        src={ receiver }
        alt="Avatar"
        draggable="false"
        placeholder="empty"
        priority
        className={ "scale " + styles.chatNavImg }
      />
    </div>

    <div className={ "container-fluid d-flex flex-column justify-content-end align-items-center justify-content-sm-end " + styles.messageDiv }>
    {
      stack.map(messageMapper)
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
          placeholder="Message*"
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

// Export Chats
export default Chats ;