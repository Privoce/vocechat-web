import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './base.query';
export const authApi = createApi({
 reducerPath: 'auth',
 baseQuery,
 endpoints: (builder) => ({
  login: builder.mutation({
   query: (credentials) => ({
    url: 'token/login',
    method: 'POST',
    body: { credential: credentials, device: 'web', device_token: 'test' }
   })
   // transformResponse: (resp) => {
   //   console.log("resp", resp);
   //   if (resp.status == 401) {
   //     resp.msg = "username or password incorrect";
   //   }
   //   return resp;
   // },
  }),
  checkInviteTokenValid: builder.mutation({
   query: (token) => ({
    url: 'user/check_invite_magic_token',
    method: 'POST',
    body: { magic_token: token }
   })
  }),
  getMetamaskNonce: builder.query({
   query: (address) => ({
    url: `/token/metamask/nonce?public_address=${address}`
   })
  }),
  logout: builder.query({
   query: () => ({ url: `token/logout` })
  })
 })
});

export const {
 useLazyGetMetamaskNonceQuery,
 useLoginMutation,
 useLazyLogoutQuery,
 useCheckInviteTokenValidMutation
} = authApi;
