import { useGetWidgetExtCSSQuery, useUpdateWidgetExtCSSMutation } from "@/app/services/server";
import StyledButton from "@/components/styled/Button";
import StyledTextarea from "@/components/styled/Textarea";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const ExtCSS = ({}: Props) => {
  const [updateWidgetCss, { isLoading, isSuccess }] = useUpdateWidgetExtCSSMutation();
  const { data = "", isLoading: loadingCss } = useGetWidgetExtCSSQuery();
  const [code, setCode] = useState(data);
  const handleUpdate = () => {
    updateWidgetCss(code);
  };
  const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(evt.target.value);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Updated!");
    }
  }, [isSuccess]);

  return (
    <div className="flex flex-col gap-1">
      <StyledTextarea
        disabled={loadingCss}
        onChange={handleChange}
        rows={12}
        value={code}
      ></StyledTextarea>
      <StyledButton disabled={isLoading} onClick={handleUpdate} className="small">
        Update CSS Code
      </StyledButton>
    </div>
  );
};

export default ExtCSS;
