// import React from "react";
import styled from "styled-components";
const Styled = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  .input {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    label {
      white-space: nowrap;
      font-size: 14px;
      color: #555;
    }
  }
  .tip {
    font-size: 12px;
    color: #999;
    line-height: 1.5;
  }
`;
import Input from "../../common/component/styled/Input";
import Button from "../../common/component/styled/Button";
import {
  useGetThirdPartySecretQuery,
  useUpdateThirdPartySecretMutation,
} from "../../app/services/server";
export default function APIConfig() {
  const { data } = useGetThirdPartySecretQuery();
  const [
    updateSecret,
    { data: updatedSecret },
  ] = useUpdateThirdPartySecretMutation();
  console.log("secret", data);
  return (
    <Styled>
      <div className="input">
        <label htmlFor="secret">API Secure Key:</label>
        <Input type="password" id="secret" value={updatedSecret || data} />
      </div>
      <Button onClick={updateSecret}>Update Secret</Button>
      <div className="tip">
        Tip: The security key agreed between the rustchat server and the
        third-party app is used to encrypt the communication data.{" "}
      </div>
    </Styled>
  );
}
