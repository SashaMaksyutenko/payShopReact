import Header from '@/components/header'
import Footer from '@/components/footer'
import styles from '../styles/signin.module.scss'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { useState } from 'react'
import Link from 'next/link'
import { Formik, Form } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import LoginInput from '@/components/inputs/loginInput'
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
  country
} from 'next-auth/react'
import DotLoaderSpinner from '../components/loaders/dotLoader'
import CircledIconBtn from '../components/buttons/circledIconBtn'
import Router from 'next/router'
const initialValues = {
  login_email: '',
  login_password: '',
  name: '',
  email: '',
  password: '',
  conf_password: '',
  success: '',
  error: '',
  login_error: ''
}
export default function signin ({ providers, callbackUrl, csrfToken }) {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState()
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error,
    login_error
  } = user || {}
  const handleChange = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }
  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required('Email address is required.')
      .email('Please enter a valid email address.'),
    login_password: Yup.string().required('Please enter a password.')
  })
  const registerValidation = Yup.object({
    name: Yup.string()
      .required('Enter your name !')
      .min(2, 'First name must be between 2 and 16 characters.')
      .max(16, 'First name must be between 2 and 16 characters.')
      .matches(/^[aA-zZ]/, 'Numbers and special characters are not allowed.'),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email('Enter a valid email address.'),
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &).'
      )
      .min(6, 'Password must be atleast 6 characters.')
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required('Confirm your password.')
      .oneOf([Yup.ref('password')], 'Passwords must match.')
  })
  const signUpHandler = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post('/api/auth/signup', {
        name,
        email,
        password
      })
      setUser({ ...user, error: '', success: data.message })
      setLoading(false)
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password
        }
        const res = await signIn('credentials', options)
        Router.push('/')
      }, 2000)
    } catch (error) {
      setLoading(false)
      setUser({ ...user, success: '', error: error.response.data.message })
    }
  }
  const signInHandler = async () => {
    setLoading(true)
    let options = {
      redirect: false,
      email: login_email,
      password: login_password
    }
    const res = await signIn('credentials', options)
    setUser({ ...user, success: '', error: '' })
    setLoading(false)
    if (res?.error) {
      setLoading(false)
      setUser({ ...user, login_error: res?.error })
    } else {
      return Router.push(callbackUrl || '/')
    }
  }
  const country = {
    name: 'Ukraine',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Flag_of_Ukraine.png/640px-Flag_of_Ukraine.png'
  }
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              {' '}
              We'd be happy to join us !{' '}
              <Link className={styles.noUnderline} href='/'>
                {' '}
                Go store
              </Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password
              }}
              validationSchema={loginValidation}
              onSubmit={() => {
                signInHandler()
              }}
            >
              {form => (
                <Form method='post' action='/api/auth/signin/email'>
                  <input
                    type='hidden'
                    name='csrfToken'
                    defaultValue={csrfToken}
                  />
                  <LoginInput
                    type='text'
                    name='login_email'
                    icon='email'
                    placeholder='Email Address'
                    onChange={handleChange}
                  />
                  <LoginInput
                    type='password'
                    name='login_password'
                    icon='password'
                    placeholder='Password'
                    onChange={handleChange}
                  />
                  <CircledIconBtn type='submit' text='Sign in' />
                  {login_error && (
                    <span className={styles.error}>{login_error}</span>
                  )}
                  <div className={styles.forgot}>
                    <Link className={styles.noUnderline} href='/auth/forgot'>
                      Forgot Password ?
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login__socials_wrap}>
                {providers.map(provider => {
                  if (provider.name == 'Credentials') {
                    return
                  }
                  return (
                    <div key={provider.name}>
                      <button
                        className={styles.social__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <img src={`../../icons/${provider.name}.png`} alt='' />
                        Sign In with {provider.name}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Sign up</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                conf_password
              }}
              validationSchema={registerValidation}
              onSubmit={() => {
                signUpHandler()
              }}
            >
              {form => (
                <Form>
                  <LoginInput
                    type='text'
                    name='name'
                    icon='user'
                    placeholder='Full Name'
                    onChange={handleChange}
                  />
                  <LoginInput
                    type='text'
                    name='email'
                    icon='email'
                    placeholder='Email Address'
                    onChange={handleChange}
                  />
                  <LoginInput
                    type='password'
                    name='password'
                    icon='password'
                    placeholder='Password'
                    onChange={handleChange}
                  />
                  <LoginInput
                    type='password'
                    name='conf_password'
                    icon='password'
                    placeholder='Re-Type Password'
                    onChange={handleChange}
                  />
                  <CircledIconBtn type='submit' text='Sign up' />
                </Form>
              )}
            </Formik>
            <div>
              {success && <span className={styles.success}>{success}</span>}
            </div>
            <div>{error && <span className={styles.error}>{error}</span>}</div>
          </div>
        </div>
      </div>
      <Footer country='Ukraine' />
    </>
  )
}
export async function getServerSideProps (context) {
  const { req, query } = context
  const session = await getSession({ req })
  const callbackUrl = query.callbackUrl || '/'
  if (session) {
    return {
      redirect: {
        destination: callbackUrl
      }
    }
  }
  const csrfToken = await getCsrfToken(context)
  const providers = await getProviders()
  return {
    props: {
      providers: providers ? Object.values(providers) : [],
      csrfToken,
      callbackUrl
    }
  }
}
