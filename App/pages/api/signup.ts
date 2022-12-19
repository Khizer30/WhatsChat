import type { NextApiRequest, NextApiResponse } from "next" ;
import type { User } from "@prisma/client" ;
// ...
import { createUser } from "components/Prisma" ;
import { createResponse } from "components/Library" ;
import type { SignUpReqType, ReCAPTCHAResType } from "components/Interfaces" ;

// Sign Up
export default async (req: NextApiRequest, res: NextApiResponse) =>
{
  const data: SignUpReqType = req.body ;

  try
  {
    const response: Response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${ process.env.RECAPTCHA_SECRET_KEY! }&response=${ data.token }`, 
    {
      mode: "cors",
      method: "POST"
    }) ;
    const result: ReCAPTCHAResType = await response.json() ;

    if (result.success)
    {
      const user: User | null = await createUser(data) ;

      if (user)
      {
        res.end(createResponse(100, "Congratulations, User Created")) ;
      }
      else
      {
        res.end(createResponse(403, "*User Already Exists")) ;
      }
    }
    else
    {
      res.end(createResponse(402, "*Bot Detected")) ;
    }
  }
  catch
  {
    res.end(createResponse(401, "*Error Connecting To ReCAPTCHA!")) ;
  }
}