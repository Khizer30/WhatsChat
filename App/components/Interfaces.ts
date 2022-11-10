// Message Interface
interface MessageType
{
  mid?: number ;
  gid?: number ;
  seconds?: string ;
  time: string ;
  sender: string ;
  text: string ;
}

// Export
export type { MessageType } ;