import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import toast from 'react-hot-toast';
import BASE_URL, { tokenHeader } from '../config';
const whiteList = ['login', 'checkInviteTokenValid'];
const baseQuery = fetchBaseQuery({
 baseUrl: BASE_URL,
 prepareHeaders: (headers, { getState, endpoint }) => {
  console.log('req', endpoint);
  const { token } = getState().authData;
  if (token && !whiteList.includes(endpoint)) {
   headers.set(tokenHeader, token);
  }
  // 发送channel msg (临时举措)
  // if (endpoint == "sendChannelMsg") {
  //   headers.set("Content-Type", "text/plain");
  // }
  return headers;
 }
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
 let result = await baseQuery(args, api, extraOptions);
 if (result.error) {
  console.log('api error', result.error);
  switch (result.error.originalStatus) {
   case 404:
    {
     toast.error('Request Not Found');
    }
    break;
   case 500:
    {
     toast.error(result.error.data || 'server error');
    }
    break;
   case 401:
    {
     toast.error('token expired, please login again');
     // try to get a new token with refreshToken
     // const refreshResult = await baseQuery('/refreshToken', api, extraOptions);
     // if (refreshResult.data) {
     //     // store the new token
     //     api.dispatch(tokenReceived(refreshResult.data));
     //     // retry the initial query
     //     result = await baseQuery(args, api, extraOptions);
     // } else {
     //     api.dispatch(loggedOut());
     // }
    }

    break;

   default:
    break;
  }
 }
 return result;
};

export default baseQueryWithReauth;
