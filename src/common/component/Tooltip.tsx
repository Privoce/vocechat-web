// import React from 'react'
import Tippy, { TippyProps } from "@tippyjs/react";
import styled from "styled-components";
import { FC, ReactElement } from "react";

const StyledTip = styled.div`
  position: relative;
  background: #fff;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #1d2939;
  border-radius: var(--br);
  box-shadow: 0 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
  &::after {
    background-color: inherit;
    position: absolute;
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 1px;
    transform-origin: center;
  }
  &.right::after {
    left: 0;
    top: 50%;
    transform: translate3d(-50%, -50%, 0) rotate(45deg);
  }
  &.top::after {
    left: 50%;
    bottom: 0;
    transform: translate3d(-50%, 50%, 0) rotate(45deg);
  }
  &.bottom::after {
    top: 0;
    left: 50%;
    transform: translate3d(-50%, -50%, 0) rotate(45deg);
  }
`;

interface IProps extends TippyProps {
  tip: string;
  children: ReactElement;
}

const Tooltip: FC<IProps> = ({
  tip = "",
  placement = "right",
  delay = null,
  children,
  ...rest
}) => {
  const defaultDuration: [number, number] = [300, 250];

  return (
    <Tippy
      offset={[0, 18]}
      duration={delay ? defaultDuration : 0}
      delay={delay ?? [150, 0]}
      placement={placement}
      content={<StyledTip className={placement}>{tip}</StyledTip>}
      {...rest}
    >
      {children}
    </Tippy>
  );
};

export default Tooltip;
