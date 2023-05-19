import { useEffect } from "react";

import {
  useCheckLicenseMutation,
  useGetLicenseQuery,
  useUpsertLicenseMutation
} from "@/app/services/server";
import { useAppSelector } from "@/app/store";

// type Props = {
//   refetchOnMountOrArgChange?: boolean
// } | undefined
const useLicense = (refetchOnMountOrArgChange = false) => {
  const { userCount, isGuest, upgraded } = useAppSelector((store) => {
    return {
      userCount: store.users.ids.length,
      isGuest: store.authData.guest,
      upgraded: store.server.upgraded
    };
  });
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
