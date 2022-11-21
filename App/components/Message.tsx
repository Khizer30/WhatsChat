import Image from "next/image" ;
// ...
import type { MessageType } from "components/Interfaces" ;
import styles from "styles/chat.module.css" ;
import userImg from "images/avatar_1.webp" ;

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
          src={ userImg }
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