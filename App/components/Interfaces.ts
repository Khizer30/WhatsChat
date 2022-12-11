// Message Interface
interface MessageType
{
  mid?: number ;
  gid?: number ;
  uid: number ;
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
  gender: string ;
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