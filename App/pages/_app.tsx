import { SessionProvider } from "next-auth/react" ;
import type { AppProps } from "next/app" ;
// ...
import "../styles/global.css" ;

// App
function App({ Component, pageProps: { session, ...pageProps } }: AppProps): JSX.Element
{
  return (
  <>
    <SessionProvider session={ session } refetchOnWindowFocus={ false }>
      <Component { ...pageProps } />
    </SessionProvider>
  </>
  )
}

// Export App
export default App ;