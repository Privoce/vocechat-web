import { useEffect } from "react";
import dayjs from "dayjs";

import useStreaming from "@/hooks/useStreaming";
import { useAppSelector } from "../app/store";
import { shallowEqual } from "react-redux";

export default function useSSE() {
  const loginUid = useAppSelector((store) => store.authData.user?.uid, shallowEqual);
  const token = useAppSelector((store) => store.authData.token, shallowEqual);
  const expireTime = useAppSelector(
    (store) => store.authData.expireTime ?? +new Date(),
    shallowEqual
  );
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
