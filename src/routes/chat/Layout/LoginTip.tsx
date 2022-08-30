// import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { resetAuthData } from "../../../app/slices/auth.data";
import Button from "../../../common/component/styled/Button";
import useLogout from "../../../common/hook/useLogout";
const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #e5e7eb;
  border-radius: var(--br);
  width: 100%;
  width: -webkit-fill-available;
  padding: 16px 18px;
  .txt {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #98a2b3;
    .hand {
      font-size: 20px;
      margin-right: 10px;
    }
  }
`;
// type Props = {};

const LoginTip = () => {
  const dispatch = useDispatch();
  const { clearLocalData } = useLogout();
  const navigateTo = useNavigate();
  const handleSignIn = () => {
    dispatch(resetAuthData());
    clearLocalData();
    navigateTo("/login");
  };

  return (
    <Styled>
      <span className="txt">
        <i className="hand">👋</i>
        Please sign in to send message
      </span>
      <Button onClick={handleSignIn} className="small">{`Sign In`}</Button>
    </Styled>
  );
};

export default LoginTip;
