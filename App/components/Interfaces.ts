// Message Interface
interface MessageType
{
  mid?: number ;
  gid?: number ;
  sender: number ;
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
  email: string ;
  name: string ;
}

// Group Request Interface
interface GroupReqType
{
  sender: number ;
  reciever: number ;
}

// Res Interface
interface ResType
{
  code: number ;
  message: string ;
}

// Exports
export type { MessageType, LoginType, UserType, GroupReqType, ResType } ;