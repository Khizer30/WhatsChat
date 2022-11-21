import { useState } from "react" ;
import Head from "next/head" ;
import Image from "next/image" ;
import Link from "next/link" ;
import { useRouter } from "next/router" ;
import { signIn } from "next-auth/react" ;
import type { NextRouter } from "next/router" ;
import type { SignInResponse } from "next-auth/react" ;
// ...
import { loginObj } from "components/Library" ;
import type { LoginType } from "components/Interfaces" ;
import styles from "styles/login.module.css" ;
import logo from "images/logo_black.webp" ;

// Login
function Login(): JSX.Element
{
  // Variables
  const [inputs, setInputs] = useState<LoginType>(loginObj) ;
  const [mes, setMes] = useState<string>("") ;
  const router: NextRouter = useRouter() ;

  // Handle Change
  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void
  {
    setInputs((values: LoginType) => ({ ...values, [event.target.name]: event.target.value })) ;
  }

  // Handle Submit
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void
  {
    event.preventDefault() ;
    send() ;
  }

  // Check It
  function checkIt(it: string, len: number, reg: string): boolean
  {
    if (it !== "")
    {
      if (it.length <= len)
      {
        let pattern: RegExp = new RegExp(reg) ;

        if (pattern.test(it))
        {
          return true ;
        }
        else
        {
          setMes("Invalid Email OR Password") ;
          return false ;
        }
      }
      else
      {
        setMes("Invalid Email OR Password") ;
        return false ;
      }
    }
    else
    {
      setMes("Please, Enter Your Email & Password") ;
      return false ;
    }
  }

  // Send
  async function send(): Promise<void>
  {
    setMes("") ;

    if (checkIt(inputs.email.trim(), 100, "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com)\\b") &&
    checkIt(inputs.password.trim(), 100, "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&=])[A-Za-z\\d@$!%*#?&=]{8,}$"))
    {
      const response: SignInResponse | undefined = await signIn("credentials", { email: inputs.email.trim(), password: inputs.password.trim(), redirect: false }) ;

      if (response?.ok)
      {
        router.replace("/chat") ;
      }
      else
      {
        setMes("Invalid User") ;
      }
    }
  }

  return (
  <>
    <Head>
      <title> Log In | WhatsChat </title>

      <meta name="description" content="WhatsChat Log In" />
      <meta name="keywords" content="WhatsChat, Log In" />
    </Head>

    <div className={ "container-fluid d-flex d-sm-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center " + styles.logInContainer }>
      <div className={ "d-flex flex-column justify-content-center align-items-center " + styles.logInDiv }>
        <Image
          src={ logo }
          alt="Logo"
          draggable="false"
          placeholder="empty"
          priority
          className={ styles.logInImg }
        />

        <form method="post" target="_self" encType="application/x-www-form-urlencoded" className="d-flex flex-column justify-content-center align-items-center w-100"
        onSubmit={ handleSubmit } autoComplete="off" noValidate>

        { mes &&
          <span className={ styles.logInErr }> { mes } </span>
        }
        { !mes &&
          <span className={ styles.logInErr }> <br /> </span>
        }

          <input 
            name="email"
            type="email"
            value={ inputs.email }
            onChange={ handleChange }
            maxLength={ 100 }
            minLength={ 0 }
            placeholder="*Email"
            autoFocus
            required
            className={ "form-control " + styles.logInTxt } 
          />

          <input 
            name="password"
            type="password"
            value={ inputs.password }
            onChange={ handleChange }
            maxLength={ 100 }
            minLength={ 0 }
            placeholder="*Password"
            required
            className={ "form-control " + styles.logInTxt } 
          />

          <button onClick={ send } type="button" className={ styles.logInBtn }> Log In </button>

          <Link href="#" className={ styles.logInLink }> Create New Account </Link>
        </form>
      </div>
    </div>

    <footer className="d-flex d-sm-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center">
      <p className="footerP"> @WhatsChat </p>
    </footer>
  </>
  )
}

// Export Login
export default Login ;