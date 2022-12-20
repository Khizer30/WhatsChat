import Head from "next/head" ;
import Image from "next/image" ;
import Link from "next/link" ;
import ReCAPTCHA from "react-google-recaptcha" ;
import { useState, useEffect, useRef } from "react" ;
import { useRouter } from "next/router" ;
import { useSession, signIn } from "next-auth/react" ;
import type { NextRouter } from "next/router" ;
import type { SignInResponse } from "next-auth/react" ;
// ...
import { loginObj } from "components/Library" ;
import type { LogInType } from "components/Interfaces" ;
import styles from "styles/login.module.css" ;
import logo from "images/logo_black.svg" ;

// Log In
function LogIn(): JSX.Element
{
  // Variables
  const { status } = useSession() ;
  const [loading, setLoading] = useState<boolean>(true) ;
  const [inputs, setInputs] = useState<LogInType>(loginObj) ;
  const [mes, setMes] = useState<string>("") ;
  const recaptchaRef = useRef<ReCAPTCHA | undefined>(undefined) ;
  const router: NextRouter = useRouter() ;

  // Redirect
  useEffect(() =>
  {
    if (status === "authenticated")
    {
      router.replace("/dashboard") ;
    }
    else if (status === "unauthenticated")
    {
      if (recaptchaRef.current)
      {
        recaptchaRef.current.reset() ;
      }

      setLoading(false) ;
    }
  }, [status]) ;

  // Handle Change
  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void
  {
    setInputs((values: LogInType) => ({ ...values, [event.target.name]: event.target.value })) ;
  }

  // Handle Submit
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void
  {
    event.preventDefault() ;
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
    if (recaptchaRef.current)
    {
      setMes("") ;

      if (checkIt(inputs.email.trim(), 100, "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com)\\b") &&
      checkIt(inputs.password.trim(), 100, "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&=])[A-Za-z\\d@$!%*#?&=]{8,}$"))
      {
        const recaptchaResult: string | null = await recaptchaRef.current.executeAsync() ;

        if (recaptchaResult)
        {
          const response: SignInResponse | undefined = await signIn("credentials", { email: inputs.email.trim(), password: inputs.password.trim(), token: recaptchaResult, redirect: false, callbackUrl: "/dashboard" }) ;

          if (response && !response.ok)
          {
            setMes("User Doesn't Exist") ;
            recaptchaRef.current.reset() ;
          }
        }
        else
        {
          setMes("ReCAPTCHA Error, Reload The Page") ;
          recaptchaRef.current.reset() ;
        }
      }
    }
  }

  // Loading Screen
  if (loading)
  {
    return (
    <>
      <Head>
        <title> Redirect </title>

        <meta name="description" content="WhatsChat Redirect" />
        <meta name="keywords" content="WhatsChat, Redirect" />
      </Head>

      <h1 style={{ color: "white" }}> Loading... </h1>
    </>
    )
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
        onSubmit={ handleSubmit } autoComplete="off">

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

          <button type="button" onClick={ send } className={ styles.logInBtn }> Log In </button>

          <Link href="/auth/signup" className={ styles.logInLink }> Create New Account </Link>

          <ReCAPTCHA
            ref={ recaptchaRef }
            sitekey={ process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY! }
            size="invisible"
            theme="dark"
          />
        </form>
      </div>
    </div>

    <footer className="d-flex d-sm-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center">
      <p className="footerP"> @WhatsChat </p>
    </footer>
  </>
  )
}

// Export Log In
export default LogIn ;