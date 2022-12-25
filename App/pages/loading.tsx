import Head from "next/head" ;
// ...
import LoadingIcon from "components/LoadingIcon" ;

// Loading
function Loading(): JSX.Element
{
  return (
  <>
    <Head>
      <title> Loading | WhatsChat </title>

      <meta name="description" content="WhatsChat Loading" />
      <meta name="keywords" content="WhatsChat, Loading" />
    </Head>

    <LoadingIcon />
  </>
  )
}

// Export Loading
export default Loading ;