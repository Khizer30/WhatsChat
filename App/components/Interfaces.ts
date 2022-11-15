// Message Interface
interface MessageType
{
  mid?: number ;
  gid?: number ;
  time: string ;
  sender: number ;
  text: string ;
}

// User Interface
interface UserType
{
  uid?: string ;
  name?: string ;
  email: string ;
  password: string ;
}

// Exports
export type { MessageType, UserType } ;