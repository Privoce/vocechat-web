import { useEffect } from "react";
import dayjs from "dayjs";
import { useAppSelector } from "../app/store";
import initCache, { useRehydrate } from "../app/cache";
import useStreaming from "../common/hook/useStreaming";
// type Props={
//   guest?:boolean
// }
export default function usePreload() {
    const { rehydrate, rehydrated } = useRehydrate();
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
    useEffect(() => {
        initCache();
        rehydrate();
        return () => {
            setStreamingReady(false);
        };
    }, []);

    const tokenAlmostExpire = dayjs().isAfter(new Date(expireTime - 20 * 1000));
    const canStreaming = !!loginUid && rehydrated && !!token && !tokenAlmostExpire;
    // console.log("ttt", loginUid, rehydrated, token);

    useEffect(() => {
        setStreamingReady(canStreaming);
    }, [canStreaming]);

    return {
        rehydrated
    };
}
