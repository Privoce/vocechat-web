import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { updateToken, resetAuthData } from "../slices/auth.data";
import BASE_URL, { tokenHeader } from "../config";
import { RootState } from "../store";
import { getLocalAuthData } from "../../common/utils";

const whiteList = [
  "guestLogin",
  "login",
  "register",
  "sendLoginMagicLink",
  "sendRegMagicLink",
  "checkEmail",
  "checkMagicTokenValid",
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
  "getBotRelatedChannels",
  "sendMessageByBot"
];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const { token } = (getState() as RootState).authData;
    if (token && !whiteList.includes(endpoint)) {
      headers.set(tokenHeader, token);
    }
    return headers;
  }
});

let waitingForRenew: null | any = null;
const baseQueryWithTokenCheck = async (args, api, extraOptions) => {
  if (waitingForRenew) {
    await waitingForRenew;
  }
  // 先检查token是否过期，过期则renew [从localstorage取]
  const { token, refreshToken, expireTime } = getLocalAuthData();

  let result = null;
  // console.log("base check", whiteList.includes(api.endpoint), api.endpoint);
  if (!whiteList.includes(api.endpoint) && dayjs().isAfter(new Date(expireTime - 20 * 1000))) {
    // 快过期了，renew
    waitingForRenew = baseQuery(
      {
        url: "/token/renew",
        method: "POST",
        body: {
          token,
          refresh_token: refreshToken
        }
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
    console.error("api error", result.error, api.endpoint);
    switch (result.error.originalStatus || result.error.status) {
      case "FETCH_ERROR":
        {
          toast.error(`${api.endpoint}: Failed to fetch`);
        }
        break;
      case 400:
        toast.error("Bad Request");
        break;
      case 401:
        {
          if (api.endpoint !== "login") {
            api.dispatch(resetAuthData());
            location.href = "/#/login";
            toast.error("API Not Authenticated");
          }
        }
        break;
      case 403:
        toast.error("Request Not Allowed");
        break;
      case 404:
        {
          if (api.endpoint !== "login") {
            toast.error("Request Not Found");
          }
        }
        break;
      case 413:
        {
          toast.error("File size too large");
        }
        break;
      case 451:
        {
          // 证书错误
          if (api.endpoint !== "login") {
            // 退出登录
            api.dispatch(resetAuthData());
            location.href = "/#/login";
          }
          toast.error(result.error.data || "License Error");
        }
        break;
      case 500:
      case 503:
        {
          toast.error(result.error.data || "Server Error");
        }
        break;

      default:
        break;
    }
  }
  return result;
};

export default baseQueryWithTokenCheck;
