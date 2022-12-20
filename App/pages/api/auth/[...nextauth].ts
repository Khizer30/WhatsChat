import NextAuth from "next-auth" ;
import CredentialsProvider from "next-auth/providers/credentials" ;
import type { NextAuthOptions, DefaultUser } from "next-auth" ;
// ...
import { fetchUser } from "components/Prisma" ;
import type { UserType, ReCAPTCHAResType } from "components/Interfaces" ;

// Auth Options
const authOptions: NextAuthOptions =
{
  pages:
  {
    signIn: "../../auth/login"
  },
  providers:
  [
    CredentialsProvider({
      id: "credentials",
      name: "WhatsChat",
      type: "credentials",
      credentials:
      {
        email: { type: "text" },
        password: { type: "password" },
        token: { type: "text" }
      },
      async authorize(credentials, req): Promise<DefaultUser | null>
      {
        let user: DefaultUser | null = null ;
        let data: UserType | null = null ;

        if (credentials)
        {
          const response: Response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${ process.env.RECAPTCHA_SECRET_KEY! }&response=${ credentials.token }`, 
          {
            mode: "cors",
            method: "POST"
          }) ;
          const result: ReCAPTCHAResType = await response.json() ;

          if (result.success)
          {
            data = await fetchUser({ email: credentials.email, password: credentials.password }) ;
          }
        }

        if (data)
        {
          user =
          {
            id: `${ data.uid }`,
            name: JSON.stringify(data)
          } ;
        }

        return user ;
      }
    })
  ],
  session:
  {
    strategy: "jwt",
    maxAge: 60 * 60
  }
} ;

// Export
export default NextAuth(authOptions) ;