import Head from "next/head" ;
import Image from "next/image" ;
// ...
import img from "images/warning.svg" ;

// Error
function Error(): JSX.Element
{
  return (
  <>
    <Head>
      <title> 404 | WhatsChat </title>

      <meta name="description" content="WhatsChat 404" />
      <meta name="keywords" content="WhatsChat, 404" />
    </Head>

    <div className="container-fluid d-flex flex-column justify-content-center align-items-center errorContainer">
      <Image
        src={ img }
        alt="404"
        draggable="false"
        placeholder="empty"
        priority
      />
      <h1 className="errorH1"> 404 </h1>
      <h1 className="errorH2"> PAGE NOT FOUND! </h1>
    </div>
  </>
  )
}

// Export Error
export default Error ;