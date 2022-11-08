import { useState } from "react" ;
import Image from "next/image" ;
// ...
import styles from "../styles/chat.module.css" ;
import user1 from "../public/images/avatar_1.webp" ;

// Chat
function Chat(): JSX.Element
{
  // Variables
  const [message, setMessage] = useState<string>("") ;

  // Handle Change
  function handleChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    setMessage(event.target.value) ;
  }

  return (
  <>
    <div className={ "container-fluid d-flex flex-column justify-content-center align-items-center " + styles.messageDiv }>
      
      <div className={ "row scalar " + styles.message }>
        <div className="col-2 d-flex justify-content-start align-items-end">
          <span className={ styles.time }> 11:30 </span>
        </div>

        <div className="col-8 text-break d-flex d-sm-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center">
          <p className={ styles.messageText }> Bla Bla Bla </p>
        </div>

        <div className="col-2 d-flex justify-content-end align-items-center">
          <Image
            src={ user1 }
            alt="Avatar"
            draggable="false"
            placeholder="blur"
            priority
            className={ styles.messageImg }
          />
        </div>
      </div>
      
    </div>

    <div className={ "container-fluid d-flex justify-content-center align-items-center " + styles.inputDiv }>
      <input 
        name="message"
        type="text"
        value={ message }
        onChange={ handleChange }
        maxLength={ 100 }
        minLength={ 0 }
        placeholder="Message*"
        required
        className={ "d-flex justify-content-center align-items-center form-control " + styles.txtInput }
      />

      <button type="button" className={ "d-flex justify-content-center align-items-center " + styles.inputBtn }>
        <i className={ "fas fa-play " + styles.btnIcon }></i>
      </button>
    </div>
  </>
  )
}

// Export Chat
export default Chat ;