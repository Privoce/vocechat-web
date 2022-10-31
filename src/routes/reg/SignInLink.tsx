import { useEffect } from 'react';
import styled from "styled-components";

const StyledSignInLink = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 30px;
  >.item{
    text-align: center;
    margin: 0;
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
}
`;

export default function SignInLink({ token }: { token?: string }) {
  const handleSignIn = () => {
    location.href = "/#/login";
  };
  useEffect(() => {
    const isMobile = "ontouchstart" in document.documentElement;
    // 直接跳转
    if (isMobile && !!token) {
      location.href = `https://voce.chat/download?link=${encodeURIComponent(`${location.origin}?magic_token=${token}`)}`;
    }
  }, [token]);

  return (
    <StyledSignInLink>
      <li className="item">
        <span>Have an account?</span>
        <a onClick={handleSignIn}>Sign In</a>
      </li>
    </StyledSignInLink>
  );
}
