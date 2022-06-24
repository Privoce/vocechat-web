import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledSignUpLink = styled.p`
  text-align: center;
  margin: 24px 0 8px;

  > span {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #667085;
    margin-right: 4px;
  }

  > a {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #22d3ee;
    cursor: pointer;
  }
`;

export default function MagicLinkLogin() {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <StyledSignUpLink>
      <span>Don’t have an account?</span>
      <a onClick={handleSignUp}>Sign up</a>
    </StyledSignUpLink>
  );
}
