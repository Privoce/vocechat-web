import { useEffect } from "react";
import { useCheckLicenseMutation, useUpsertLicenseMutation } from "../../app/services/server";

const useLicense = (license?: string) => {
  const [check, { data, isLoading: isChecking, isSuccess: checked }] = useCheckLicenseMutation();
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
  useEffect(() => {
    if (license) {
      checkLicense(license);
    }
  }, [license]);

  return {
    validInfo: data,
    checked,
    checking: isChecking,
    upserting,
    upserted,
    checkLicense,
    upsertLicense
  };
};

export default useLicense;
