import Image from "next/image" ;
import type { Message } from "@prisma/client" ;
// ...
import avatars from "components/Avatars" ;
import styles from "styles/chat.module.css" ;

// Message Box
function MessageBox({ image, time, text }: Message): JSX.Element
{
  return (
  <>
    <div className={ "row d-flex justify-content-center align-items-center " + styles.message }>
      <div className={ "col-3 d-flex justify-content-start align-items-end " + styles.messageHeight }>
        <p className={ styles.messageTime }> { time } </p>
      </div>

      <div className={ "col-6 text-break d-flex justify-content-center align-items-center " + styles.messageHeight }>
        <p className={ styles.messageText }> { text } </p>
      </div>
        
      <div className={ "col-3 d-flex justify-content-end align-items-center " + styles.messageHeight }>
        <Image
          src={ avatars[image] }
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

// Export Message Box
export default MessageBox ;