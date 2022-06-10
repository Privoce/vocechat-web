import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { updateToken, resetAuthData } from "../slices/auth.data";
import BASE_URL, { tokenHeader } from "../config";
const whiteList = [
  "login",
  "register",
  "sendMagicLink",
  "checkInviteTokenValid",
  "getGoogleAuthConfig",
  "getGithubAuthConfig",
  "getSMTPStatus",
  "getLoginConfig",
  "getServerVersion",
  "getServer",
  "getOpenid",
  "getMetamaskNonce",
  "renew",
  "getInitialized",
  "createAdmin",
];
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
let waitingForRenew = null;
const baseQueryWithTokenCheck = async (args, api, extraOptions) => {
  if (waitingForRenew) {
    await waitingForRenew;
  }
  // 先检查token是否过期，过期则renew
  const {
    token,
    refreshToken,
    expireTime = +new Date(),
  } = api.getState().authData;
  let result = null;
  if (
    !whiteList.includes(api.endpoint) &&
    dayjs().isAfter(new Date(expireTime - 20 * 1000))
  ) {
    // 快过期了，renew
    waitingForRenew = baseQuery(
      {
        url: "/token/renew",
        method: "POST",
        body: {
          token,
          refresh_token: refreshToken,
        },
      },
      api,
      extraOptions
    );
    result = await waitingForRenew;
    waitingForRenew = null;
    if (result.data) {
      // store the new token
      api.dispatch(updateToken(result.data));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    }
  } else {
    result = await baseQuery(args, api, extraOptions);
  }
  if (result?.error) {
    console.log("api error", result.error, api.endpoint);
    switch (result.error.originalStatus || result.error.status) {
      case "FETCH_ERROR":
        {
          toast.error(`${api.endpoint}: Failed to fetch`);
        }
        break;
      case 404:
        {
          toast.error("Request Not Found");
        }
        break;
      case 500:
        {
          toast.error(result.error.data || "server error");
        }
        break;
      case 401:
        {
          if (api.endpoint !== "login") {
            api.dispatch(resetAuthData());
            location.href = "/#/login";
            toast.error("API Not Authenticated");
          }
          // toast.error("token expired, please login again");
          // } else {
          // return;
          // }
        }
        break;
      case 403:
        toast.error("Request Not Allowed");
        break;
      default:
        break;
    }
  }
  return result;
};

export default baseQueryWithTokenCheck;
