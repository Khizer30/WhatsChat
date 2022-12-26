import Head from "next/head" ;
import { useRouter } from "next/router" ;
import { useSession } from "next-auth/react" ;
import type { NextRouter } from "next/router" ;
// ...
import LoadingIcon from "components/LoadingIcon" ;

// Home
function Home(): JSX.Element
{
  // Variables
  const { status } = useSession() ;
  const router: NextRouter = useRouter() ;

  // Redirect
  if (status === "unauthenticated")
  {
    router.replace("/auth/login") ;
  }
  else if (status === "authenticated")
  {
    router.replace("/dashboard") ;
  }

  return (
  <>
    <Head>
      <title> WhatsChat </title>

      <meta name="description" content="WhatsChat is an internationally available freeware, centralized instant messaging service owned by Syed Muhammad Khizer. It allows users to send texts to other members of the WhatsChat community." />
      <meta name="keywords" content="WhatsChat" />
    </Head>

    <LoadingIcon />
  </>
  )
}

// Export Home
export default Home ;