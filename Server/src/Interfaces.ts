// Message Interface
interface MessageType
{
  mid?: number ;
  gid: number ;
  uid: number ;
  time: string ;
  text: string ;
}

// Export
export type { MessageType } ;