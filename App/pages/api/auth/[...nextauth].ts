import NextAuth from "next-auth" ;
import CredentialsProvider from "next-auth/providers/credentials" ;
import type { NextAuthOptions, DefaultUser } from "next-auth" ;
// ...
import { fetchUser } from "components/Prisma" ;
import type { UserType } from "components/Interfaces" ;

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
        password: { type: "password" }
      },
      async authorize(credentials, req): Promise<DefaultUser | null>
      {
        let user: DefaultUser | null = null ;
        
        const result: UserType | null = await fetchUser({ email: credentials!.email, password: credentials!.password }) ;

        if (result)
        {
          user =
          {
            id: `${ result.uid }`,
            name: JSON.stringify(result)
          } ;
        }

        return user ;
      }
    })
  ]
} ;

// Export
export default NextAuth(authOptions) ;