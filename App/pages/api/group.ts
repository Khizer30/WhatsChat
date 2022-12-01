import type { NextApiRequest, NextApiResponse } from "next" ;
// ...
import { fetchGroup } from "components/Prisma" ;
import { createResponse } from "components/Library" ;
import type { GroupReqType } from "components/Interfaces" ;

// Group
export default async (req: NextApiRequest, res:NextApiResponse) =>
{
  const data: GroupReqType = req.body ;
  const gid: number = await fetchGroup(data.sender, data.reciever) ;

  res.end(createResponse(100, `${ gid }`)) ;
}