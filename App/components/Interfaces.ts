// Message Interface
interface MessageType
{
  mid?: number ;
  gid?: number ;
  time: string ;
  sender: string ;
  text: string ;
}

// Export
export type { MessageType } ;