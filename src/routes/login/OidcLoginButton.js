/* eslint-disable no-undef */
import { useState } from "react";
import styled from "styled-components";
import StyledModal from "../../common/component/styled/Modal";
import Modal from "../../common/component/Modal";
import { StyledSocialButton } from "./styled";
import solidSvg from "../../assets/icons/solid.svg?url";
import StyledButton from "../../common/component/styled/Button";
import SolidLoginButton from "./SolidLoginButton";

const StyledOicdLoginModal = styled(StyledModal)`
  text-align: center;
  padding: 32px 32px 16px;

  > *:first-child {
    margin-bottom: 32px;
  }

  > .button {
    > .icon {
      width: 24px;
      height: 24px;
    }

    &Cancel {
      color: #8f8f8f;
    }
  }
`;

export default function OidcLoginButton({ issuers }) {
  const [modal, setModal] = useState(false);
  if (!issuers) return null;
  return (
    <>
      <StyledSocialButton
        onClick={() => {
          setModal(true);
        }}
      >
        <img src={solidSvg} className="icon" alt="solid icon" />
        Sign in with OIDC
      </StyledSocialButton>
      {modal && (
        <Modal id="modal-modal">
          <StyledOicdLoginModal title="Login with OIDC">
            {issuers
              .filter((issuer) => issuer.enable)
              .map((issuer, index) => (
                <SolidLoginButton issuer={issuer} key={index} />
              ))}
            <StyledButton
              className="border_less ghost buttonCancel"
              onClick={() => {
                setModal(false);
              }}
            >
              Close
            </StyledButton>
          </StyledOicdLoginModal>
        </Modal>
      )}
    </>
  );
}
