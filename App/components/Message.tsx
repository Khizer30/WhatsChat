import Image from "next/image" ;
// ...
import styles from "../styles/chats.module.css" ;
import user1 from "../public/images/avatar_1.webp" ;
import type { MessageType } from "../components/Interfaces" ;

// Message
function Message({ time, sender, text }: MessageType): JSX.Element
{
  return (
  <>
    <div className={ "row scale " + styles.message }>
      <div className="col-2 d-flex justify-content-start align-items-end">
        <span className={ styles.time }> { time } </span>
      </div>

      <div className="col-8 text-break d-flex d-sm-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center">
        <p className={ styles.messageText }> { text } </p>
      </div>

      <div className="col-2 d-flex justify-content-end align-items-center">
        <Image
          src={ user1 }
          alt="Avatar"
          draggable="false"
          placeholder="empty"
          priority
          className={ styles.messageImg }
        />
      </div>
    </div>
  </>
  )
}

// Export Message
export default Message ;