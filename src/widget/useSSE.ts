import { useEffect } from "react";
import dayjs from "dayjs";

import useStreaming from "@/hooks/useStreaming";
import { useAppSelector } from "../app/store";

export default function useSSE() {
  const {
    loginUid,
    token,
    expireTime = +new Date()
  } = useAppSelector((store) => {
    return {
      loginUid: store.authData.user?.uid,
      token: store.authData.token,
      expireTime: store.authData.expireTime
    };
  });
  const { startStreaming } = useStreaming();

  const tokenAlmostExpire = dayjs().isAfter(new Date(expireTime - 20 * 1000));
  const canStreaming = !!loginUid && !!token && !tokenAlmostExpire;
  // console.log("ttt", loginUid, rehydrated, token);

  useEffect(() => {
    if (canStreaming) {
      startStreaming();
    }
  }, [canStreaming]);

  return null;
}
