import { useEffect } from "react";

import {
  useCheckLicenseMutation,
  useGetLicenseQuery,
  useUpsertLicenseMutation
} from "@/app/services/server";
import { useAppSelector } from "@/app/store";
import { shallowEqual, useDispatch } from "react-redux";
import { updateInfo } from "@/app/slices/server";

// type Props = {
//   refetchOnMountOrArgChange?: boolean
// } | undefined
const useLicense = (refetchOnMountOrArgChange = false) => {
  const dispatch = useDispatch();
  const userCount = useAppSelector((store) => store.users.ids.length, shallowEqual);
  const upgraded = useAppSelector((store) => store.server.upgraded, shallowEqual);
  const isGuest = useAppSelector((store) => store.authData.guest, shallowEqual);
  const {
    data: license,
    refetch: refetchLicense,
    isLoading
  } = useGetLicenseQuery(undefined, {
    refetchOnMountOrArgChange,
    skip: isGuest
  });
  const [check, { isLoading: isChecking, isSuccess: checked }] = useCheckLicenseMutation();
  const [upsert, { isSuccess: upserted, isLoading: upserting, reset: resetUpsert }] =
    useUpsertLicenseMutation();
  const checkLicense = (l: string) => {
    check(l);
  };
  const upsertLicense = async (l: string) => {
    // check first
    const resp = await check(l);
    if ("data" in resp && resp.data.sign) {
      return await upsert(l);
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (upserted) {
      refetchLicense();
      resetUpsert();
    }
  }, [upserted]);
  const lUserLimit = license?.user_limit ?? Number.MAX_SAFE_INTEGER;
  useEffect(() => {
    if (lUserLimit > 20) {
      dispatch(updateInfo({ upgraded: true }));
    }
  }, [lUserLimit]);

  return {
    upgraded,
    reachLimit: userCount >= lUserLimit,
    license,
    checked,
    isLoading,
    checking: isChecking,
    upserting,
    upserted,
    checkLicense,
    upsertLicense
  };
};

export default useLicense;
