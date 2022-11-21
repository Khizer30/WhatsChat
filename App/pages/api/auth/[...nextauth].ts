import NextAuth from "next-auth" ;
import CredentialsProvider from "next-auth/providers/credentials" ;
import { User } from "@prisma/client" ;
// ...
import { fetchUser } from "components/Prisma" ;

// Auth Options
const authOptions =
{
  pages:
  {
    signIn: "../../auth/login",
    signOut: "../../auth/logout"
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
      async authorize(credentials, req): Promise<User | null>
      {
        const user: User | null = await fetchUser({ email: credentials!.email, password: credentials!.password }) ;

        return user ;
      }
    }) 
  ]
} ;

// Export
export default NextAuth(authOptions) ;