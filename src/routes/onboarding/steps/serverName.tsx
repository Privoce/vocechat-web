import { FC } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import StyledInput from "../../../common/component/styled/Input";
import StyledButton from "../../../common/component/styled/Button";

const StyledWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .primaryText {
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 8px;
  }

  > .secondaryText {
    width: 360px;
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 24px;
    color: #667085;
  }

  > .input {
    width: 360px;
    height: 44px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    padding: 10px 14px;
    border: 1px solid #d0d5dd;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  }

  > .button {
    width: 360px;
    margin-top: 24px;
  }
`;
type Props = {
  serverName: string;
  setServerName: (name: string) => void;
  nextStep: () => void;
};
const ServerName: FC<Props> = ({ serverName, setServerName, nextStep }) => {
  return (
    <StyledWrapper>
      <span className="primaryText">Create a new server</span>
      <span className="secondaryText">
        Servers are shared environments where teams can work on projects and chat.
      </span>
      <StyledInput
        className="input"
        placeholder="Enter server name"
        value={serverName}
        onChange={(e) => setServerName(e.target.value)}
      />
      <StyledButton
        className="button"
        onClick={() => {
          // Verification for space name
          if (serverName === "") {
            toast.error("Please enter server name!");
            return;
          }
          nextStep();
        }}
      >
        Create Server
      </StyledButton>
    </StyledWrapper>
  );
};
export default ServerName;
