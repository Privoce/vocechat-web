// import React from 'react'
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import StyledButton from "@/components/styled/Button";
import StyledInput from "@/components/styled/Input";
import { useGetFrontendUrlQuery, useUpdateFrontendUrlMutation } from "../../../app/services/server";
import SettingBlock from "./SettingBlock";

// type Props = {}

const Index = () => {
  const { data, isSuccess: getUrlSuccess } = useGetFrontendUrlQuery();
  const [url, setUrl] = useState(location.origin);
  const { t } = useTranslation("setting");
  const { t: ct } = useTranslation();
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // update
    setUrl(evt.target.value);
  };
  const handleUpdate = () => {
    updateUrl(url);
  };
  const [updateUrl, { isLoading, isSuccess }] = useUpdateFrontendUrlMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success(ct("tip.update"));
    }
  }, [isSuccess]);
  useEffect(() => {
    if (getUrlSuccess && data) {
      setUrl(data);
    }
  }, [getUrlSuccess, data]);
  // if(!fetch)
  return (
    <SettingBlock title={t("overview.url.title")} desc={t("overview.url.desc")}>
      <div className="flex items-center gap-4 mt-2">
        <StyledInput placeholder="frontend url" value={url} onChange={handleChange} />
        <StyledButton disabled={!url || isLoading} className="small" onClick={handleUpdate}>
          {" "}
          {ct("action.update")}
        </StyledButton>
      </div>
    </SettingBlock>
  );
};

export default Index;
