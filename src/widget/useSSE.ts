import { useEffect } from "react";
import dayjs from "dayjs";
import { useAppSelector } from "../app/store";
import useStreaming from "../common/hook/useStreaming";

export default function useSSE() {
    const {
        loginUid,
        token,
        expireTime = +new Date(),
    } = useAppSelector((store) => {
        return {
            loginUid: store.authData.user?.uid,
            token: store.authData.token,
            expireTime: store.authData.expireTime
        };
    });
    const { setStreamingReady } = useStreaming();

    const tokenAlmostExpire = dayjs().isAfter(new Date(expireTime - 20 * 1000));
    const canStreaming = !!loginUid && !!token && !tokenAlmostExpire;
    // console.log("ttt", loginUid, rehydrated, token);

    useEffect(() => {
        setStreamingReady(canStreaming);
        return () => {
            setStreamingReady(false);
        };
    }, [canStreaming]);

    return null;
}
