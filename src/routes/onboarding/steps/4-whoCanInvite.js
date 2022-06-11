import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import StyledRadio from "../../../common/component/styled/Radio";
import StyledButton from "../../../common/component/styled/Button";
import { useGetLoginConfigQuery, useUpdateLoginConfigMutation } from "../../../app/services/server";

const StyledWhoCanSignUpStep = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > form {
    width: 512px;
  }
`;

export default function WhoCanInviteStep({ setStep }) {
  const { data: loginConfig } = useGetLoginConfigQuery();
  const [updateLoginConfig, { isSuccess, error }] = useUpdateLoginConfigMutation();

  const [value, setValue] = useState("EveryOne");

  // Display error
  useEffect(() => {
    if (error === undefined) return;
    toast.error(`Failed to update sign up rule: ${error.data}`);
  }, [error]);

  // Increment `step` when updating has completed
  useEffect(() => {
    if (isSuccess) setStep((prev) => prev + 1);
  }, [isSuccess]);

  return (
    <StyledWhoCanSignUpStep>
      <span className="primaryText">Last step: invite others!</span>
      <span className="secondaryText">Firstly, who can sign up to this server?</span>
      <StyledRadio
        options={["Everyone", "Invitation link only"]}
        values={["EveryOne", "InvitationOnly"]}
        value={value}
        onChange={(v) => {
          setValue(v);
          if (loginConfig !== undefined) {
            updateLoginConfig({
              ...loginConfig,
              who_can_sign_up: v
            });
          }
        }}
      />
      <StyledButton
        className="button border_less ghost"
        onClick={() => setStep((prev) => prev + 1)}
      >
        Skip
      </StyledButton>
    </StyledWhoCanSignUpStep>
  );
}
