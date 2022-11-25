// ...
import type { LoginType, ResType } from "components/Interfaces" ;

// Log In Object
const loginObj: LoginType =
{
  email: "",
  password: ""
} ;

// Create Response
function createResponse(code: number, message: string): string
{
  return JSON.stringify({ code: code, message: message }) ;
}

// Fetch GET
async function fetchGet(url: string): Promise<ResType>
{
  const response: Response = await fetch(url, 
  {
    mode: "same-origin",
    method: "GET",
    headers: 
    {
      "Content-Type": "application/json"
    }
  }) ;

  const res: ResType = await response.json() ;

  return res ;
}

// Fetch POST
async function fetchPost(url: string, data: any): Promise<ResType>
{
  const response: Response = await fetch(url, 
  {
    mode: "same-origin",
    method: "POST",
    headers: 
    {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }) ;

  const res: ResType = await response.json() ;

  return res ;
}

// Exports
export { loginObj, createResponse, fetchGet, fetchPost } ;