// Message Interface
interface MessageType
{
  gid: number ;
  uid: number ;
  image: number ;
  time: string ;
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
  name: string ;
  image: number ;
  email: string ;
}

// Group Request Interface
interface GroupReqType
{
  sender: number ;
  receiver: number ;
}

// Res Interface
interface ResType
{
  code: number ;
  message: string ;
}

// Exports
export type { MessageType, LoginType, UserType, GroupReqType, ResType } ;