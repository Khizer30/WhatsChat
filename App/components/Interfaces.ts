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
interface LogInType
{
  email: string ;
  password: string ;
}

// Sign Up Interface
interface SignUpType
{
  name: string ;
  email: string ;
  password: string ;
  re_password: string ;
  image: number ;
}

// User Interface
interface UserType
{
  uid: number ;
  name: string ;
  email: string ;
  image: number ;
}

// Group Request Interface
interface GroupReqType
{
  sender: number ;
  receiver: number ;
}

// Sign Up Request Interface
interface SignUpReqType
{
  name: string ;
  email: string ;
  password: string ;
  image: number ;
  token: string ;
}

// ReCAPTCHA Response Interface
interface ReCAPTCHAResType
{
  success: boolean ;
  challenge_ts: string ;
  hostname: string ;
}

// Res Interface
interface ResType
{
  code: number ;
  message: string ;
}

// Exports
export type { MessageType, LogInType, SignUpType, UserType, GroupReqType, SignUpReqType, ReCAPTCHAResType, ResType } ;