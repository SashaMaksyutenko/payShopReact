import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import GitHubProvider from 'next-auth/providers/github'
import Auth0Provider from 'next-auth/providers/auth0'
import CredentialsProvider from 'next-auth/providers/credentials'
import client from './lib/mongodb'
import User from '../../../models/User'
import bcrypt from 'bcrypt'
import db from '../../../utils/db'
db.connectDb()
export default NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'jsmith@example.com'
        },
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials, req) {
        const email = credentials.email
        const password = credentials.password
        const user = await User.findOne({ email })
        if (user) {
          return SignInUser({ password, user })
        } else {
          throw new Error('This email does not exist.')
        }
      }
    }),
    // OAuth authentication providers...
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER
    })
  ],
  callbacks: {
    async session ({ session, token }) {
      let user = await User.findById(token.sub)
      if (user) {
        session.user.id = token.sub || user._id.toString()
        session.user.role = user.role || 'user'
        token.role = user.role || 'user'
      } else {
        session.user.id = null
        session.user.role = 'user'
        token.role = 'user'
      }

      return session
    }
  },
  pages: {
    //signin: '/signin'
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.JWT_SECRET
})
const SignInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error('Please enter your password.')
  }
  const testPassword = await bcrypt.compare(password, user.password)
  if (!testPassword) {
    throw new Error('Email or password is wrong!')
  }
  return user
}
