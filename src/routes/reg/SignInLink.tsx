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
  const isMobile = "ontouchstart" in document.documentElement;
  const handleSignIn = () => {
    location.href = "/#/login";
  };
  const showAppEntry = isMobile && !!token;
  return (
    <StyledSignInLink>
      <li className="item">
        <span>Have an account?</span>
        <a onClick={handleSignIn}>Sign In</a>
      </li>
      {showAppEntry && <li className="item">
        <span>Using a mobile device? Open in</span>
        <a href={`https://voce.chat?magic_link=${encodeURIComponent(`${location.origin}?magic_token=${token}`)}`} target={"_blank"} rel="noreferrer">VoceChat App</a>
      </li>}
    </StyledSignInLink>
  );
}
