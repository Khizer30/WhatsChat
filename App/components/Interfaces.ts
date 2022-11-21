// Message Interface
interface MessageType
{
  mid?: number ;
  gid?: number ;
  time: string ;
  sender: number ;
  text: string ;
}

// Log In Interface
interface LoginType
{
  email: string ;
  password: string ;
}

// User Interface
interface UserType
{
  uid: number ;
  email: string ;
  name: string ;
}

// Exports
export type { MessageType, LoginType, UserType } ;