// import { useEffect } from "react";
import {
  useCheckLicenseMutation,
  useGetLicenseQuery,
  useUpsertLicenseMutation
} from "../../app/services/server";

const useLicense = () => {
  const { data: license } = useGetLicenseQuery();
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

  return {
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
