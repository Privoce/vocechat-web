// import { useEffect } from "react";
import {
  useCheckLicenseMutation,
  useGetLicenseQuery,
  useUpsertLicenseMutation
} from "../../app/services/server";
import { useAppSelector } from "../../app/store";

const useLicense = () => {
  const { userCount, isGuest } = useAppSelector((store) => {
    return { userCount: store.users.ids.length, isGuest: store.authData.guest };
  });
  const { data: license } = useGetLicenseQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: isGuest
  });
  const [check, { isLoading: isChecking, isSuccess: checked }] = useCheckLicenseMutation();
  const [upsert, { isSuccess: upserted, isLoading: upserting }] = useUpsertLicenseMutation();
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
  console.log("uuu", userCount, license);
  const lUserLimit = license?.user_limit ?? Number.MAX_SAFE_INTEGER;
  return {
    reachLimit: userCount >= lUserLimit,
    license,
    checked,
    checking: isChecking,
    upserting,
    upserted,
    checkLicense,
    upsertLicense
  };
};

export default useLicense;
