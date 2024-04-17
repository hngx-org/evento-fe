import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/sign-in',
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log('signIn', user.email);
       const request = await axios.post('https://evento-qo6d.onrender.com/api/v1/login/google', {
         email: profile?.email,
         picture: profile?.picture,
         name: profile?.name,
       });
       
    },
  },
  ...authConfig,
});

/**
 * This function checks if the user credentials are valid and access token is valid
 * - req is the cookies for next/server
 * @param req
 * @type {string | null}
 * @returns
 */

export async function getCredentials(req: ReadonlyRequestCookies) {
  // getting the token from the cookie
  let tokens = req.get('access_token')?.value;
  if (!tokens) return null;
  const decodedToken = jwtDecode(tokens);
  const credentials = { token: tokens, expires: decodedToken.exp };
  return credentials;
}
