// import React from "react";
import styled from "styled-components";
const Styled = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
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
      <Input type="password" value={updatedSecret || data} />
      <Button onClick={updateSecret}>Update Secret</Button>
    </Styled>
  );
}
