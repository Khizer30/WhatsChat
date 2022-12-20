import Head from "next/head" ;
import Image from "next/image" ;
import Link from "next/link" ;
import Lottie from "lottie-react" ;
import ReCAPTCHA from "react-google-recaptcha" ;
import { useState, useEffect, useRef } from "react" ;
import { useRouter } from "next/router" ;
import { useSession } from "next-auth/react" ;
import type React from "react" ;
import type { NextRouter } from "next/router" ;
// ...
import { signupObj, fetchPost } from "components/Library" ;
import type { SignUpType, SignUpReqType, ResType } from "components/Interfaces" ;
import styles from "styles/signup.module.css" ;
import avatars from "components/Avatars" ;
import lottieFile from "images/lottie.json" ;
import logo from "images/logo_white.svg" ;

// Sign Up
function SignUp(): JSX.Element
{
  // Variables
  const { status } = useSession() ;
  const [loading, setLoading] = useState<boolean>(true) ;
  const [inputs, setInputs] = useState<SignUpType>(signupObj) ;
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
  function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void
  {
    setInputs((values: SignUpType) => ({ ...values, [event.target.name]: event.target.value })) ;
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
          setMes("Please, Enter Valid Information") ;
          return false ;
        }
      }
      else
      {
        setMes("Please, Enter Valid Information") ;
        return false ;
      }
    }
    else
    {
      setMes("Please, Complete The Form") ;
      return false ;
    }
  }

  // Change Avatar
  function changeAvatar(): void
  {
    let newImage: number = inputs.image ;

    if (newImage < 6)
    {
      newImage++ ;
    }
    else
    {
      newImage = 1 ;
    }

    setInputs((values: SignUpType) => ({ ...values, image: newImage })) ;
  }

  // Send
  async function send(): Promise<void>
  {
    if (recaptchaRef.current)
    {
      setMes("") ;

      if (checkIt(inputs.name.trim(), 100, "^[a-zA-Z].*[\s\.]*$") && 
      checkIt(inputs.email.trim(), 100, "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com)\\b") &&
      checkIt(inputs.password.trim(), 100, "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&=])[A-Za-z\\d@$!%*#?&=]{8,}$") &&
      checkIt(inputs.re_password.trim(), 100, "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&=])[A-Za-z\\d@$!%*#?&=]{8,}$"))
      {
        if (inputs.password === inputs.re_password)
        {
          const recaptchaResult: string | null = await recaptchaRef.current.executeAsync() ;

          if (recaptchaResult)
          {
            const data: SignUpReqType =
            {
              name: inputs.name,
              email: inputs.email,
              image: inputs.image,
              password: inputs.password,
              token: recaptchaResult
            } ;

            const res: ResType = await fetchPost("/api/signup", data) ;

            if (res.code === 100)
            {
              setMes(res.message) ;
              setInputs(signupObj) ;
              setTimeout(() => router.push("/auth/login"), 2500) ;
            }
            else
            {
              setMes(res.message) ;
              recaptchaRef.current.reset() ;
            }
          }
          else
          {
            setMes("ReCAPTCHA Error, Reload The Page") ;
            recaptchaRef.current.reset() ;
          }
        }
        else
        {
          setMes("Passwords Do Not Match") ;
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
      <title> Sign Up | WhatsChat </title>

      <meta name="description" content="WhatsChat Sign Up" />
      <meta name="keywords" content="WhatsChat, Sign Up" />
    </Head>

    <div className="container-fluid">
      <div className="row">
        <div className={ "col-md-6 d-flex flex-column justify-content-center align-items-center " + styles.columnHeight }>
          <Image
            src={ logo }
            alt="Logo"
            draggable="false"
            placeholder="empty"
            priority
            className={ styles.mainImg }
          />
          <form method="post" target="_self" encType="application/x-www-form-urlencoded" className="w-75"
          onSubmit={ handleSubmit } autoComplete="off">

            <div className="d-flex justify-content-center align-items-center">
            { mes &&
              <span className={ styles.signUpErr }> { mes } </span>
            }
            { !mes &&
              <span className={ styles.signUpErr }> <br /> </span>
            }
            </div>

            <input 
              name="name"
              type="text"
              value={ inputs.name }
              onChange={ handleChange }
              maxLength={ 100 }
              minLength={ 0 }
              placeholder="*Enter Your Name"
              autoFocus
              required
              className={ "form-control " + styles.inputText }
            />

            <input 
              name="email"
              type="email"
              value={ inputs.email }
              onChange={ handleChange }
              maxLength={ 100 }
              minLength={ 0 }
              placeholder="*Enter Your Email"
              required
              className={ "form-control " + styles.inputText }
            />

            <input 
              name="password"
              type="password"
              value={ inputs.password }
              onChange={ handleChange }
              maxLength={ 100 }
              minLength={ 0 }
              placeholder="*Enter Your Password"
              required
              className={ "form-control " + styles.inputText }
            />

            <input 
              name="re_password"
              type="password"
              value={ inputs.re_password }
              onChange={ handleChange }
              maxLength={ 100 }
              minLength={ 0 }
              placeholder="*Re-Enter Your Password"
              required
              className={ "form-control " + styles.inputText }
            />
          
            <div className="d-flex justify-content-around align-items-center marginTB">
              <Image
                src={ avatars[inputs.image] }
                alt="Avatar"
                draggable="false"
                placeholder="empty"
                priority
                className={ "scale " + styles.avatarImg }
              />
              <button type="button" onClick={ changeAvatar } className={ "d-flex justify-content-center align-items-center " + styles.avatarBtn }> Change Avatar </button>
            </div>
            
            <div className="d-flex justify-content-around align-items-center marginTB">
              <button type="button" onClick={ send } className={ "d-flex justify-content-center align-items-center " + styles.mainBtn }> Sign Up </button>
            </div>

            <div className="d-flex justify-content-center align-items-center">
              <Link href="/auth/login" className={ styles.signUpLink }> Already Have An Account </Link>
            </div>

            <ReCAPTCHA
              ref={ recaptchaRef }
              sitekey={ process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY! }
              size="invisible"
              theme="dark"
            />

          </form>
        </div>
        <div className={ "col-md-6 d-flex d-md-flex justify-content-center align-items-center align-items-md-center " + styles.columnHeight }>
          <Lottie
            animationData={ lottieFile }
            autoplay={ true }
            loop={ true }
            className={ "d-flex justify-content-center align-items-center w-75 " + styles.lottie } 
          />
        </div>
      </div>
    </div>

    <footer className="d-flex d-sm-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center">
      <p className="footerP"> @WhatsChat </p>
    </footer>
  </>
  )
}

// Export Sign Up
export default SignUp ;