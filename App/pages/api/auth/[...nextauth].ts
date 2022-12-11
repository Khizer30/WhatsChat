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
        let data: UserType | null = null ;

        if (credentials)
        {
          data = await fetchUser({ email: credentials.email, password: credentials.password }) ;
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