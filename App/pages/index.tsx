import Head from "next/head" ;
import { useRouter } from "next/router" ;
import { useSession } from "next-auth/react" ;
import type { NextRouter } from "next/router" ;

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
      <title> Redirect </title>

      <meta name="description" content="WhatsChat Redirect" />
      <meta name="keywords" content="WhatsChat, Redirect" />
    </Head>

    <h1 style={{ color: "white" }}> Loading... </h1>
  </>
  )
}

// Export Home
export default Home ;