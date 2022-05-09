// import { useState, useEffect } from "react";
import Button from "../../common/component/styled/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const StyledMagicButton = styled(Button)`
  width: 100%;
  margin-bottom: 16px;
`;
export default function MagicLinkLogin() {
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    navigate("/send_magic_link");
    // signIn();
  };
  return (
    <StyledMagicButton onClick={handleGoogleLogin} href="#">
      Sign in with Magic Link
    </StyledMagicButton>
  );
}
