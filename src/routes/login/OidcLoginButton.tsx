/* eslint-disable no-undef */
import { FC, useState } from "react";
import styled from "styled-components";
import StyledModal from "../../common/component/styled/Modal";
import Modal from "../../common/component/Modal";
import { StyledSocialButton } from "./styled";
import StyledButton from "../../common/component/styled/Button";
import OidcLoginEntry from "./OidcLoginEntry";
import { OIDCConfig } from "../../types/auth";

const StyledOidcLoginModal = styled(StyledModal)`
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

    &.buttonCancel {
      color: #8f8f8f;
    }
  }
`;
interface IProps {
  issuers?: OIDCConfig[];
}
const OidcLoginButton: FC<IProps> = ({ issuers }) => {
  const [modal, setModal] = useState(false);
  if (!issuers) return null;
  return (
    <>
      <StyledSocialButton
        onClick={() => {
          setModal(true);
        }}
      >
        Sign in with OIDC
      </StyledSocialButton>
      {modal && (
        <Modal id="modal-modal">
          <StyledOidcLoginModal title="Login with OIDC">
            {issuers
              .filter((issuer) => issuer.enable)
              .map((issuer, index) => (
                <OidcLoginEntry issuer={issuer} key={index} />
              ))}
            <StyledButton
              className="border_less ghost buttonCancel"
              onClick={() => {
                setModal(false);
              }}
            >
              Close
            </StyledButton>
          </StyledOidcLoginModal>
        </Modal>
      )}
    </>
  );
};
export default OidcLoginButton;
