import { FC } from "react";
import styled from "styled-components";
import HashIcon from "../../assets/icons/channel.svg";
import LockHashIcon from "../../assets/icons/channel.private.svg";

const Styled = styled.div`
  display: flex;
  &.muted path {
    fill: #d0d5dd;
  }
`;
interface Props {
  personal?: boolean;
  muted?: boolean;
  className?: string;
}

const ChannelIcon: FC<Props> = ({ personal = false, muted = false, className = "" }) => {
  return (
    <Styled className={`${muted ? "muted" : ""} ${className}`}>
      {personal ? <LockHashIcon /> : <HashIcon />}
    </Styled>
  );
};

export default ChannelIcon;
