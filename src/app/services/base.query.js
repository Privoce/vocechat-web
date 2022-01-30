import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import BASE_URL, { tokenHeader } from "../config";
const whiteList = ["login"];
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    console.log("req", endpoint);
    const { token } = getState().authData;
    if (token && !whiteList.includes(endpoint)) {
      headers.set(tokenHeader, token);
    }
    return headers;
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
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
  return result;
};

export default baseQueryWithReauth;
