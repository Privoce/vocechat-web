import { FC } from "react";
import styled from "styled-components";

const Styled = styled.div`
  background: #ecfdff;
  border-radius: 4px;
  height: 8px;
  overflow: hidden;
  .progress {
    transition: all 0.25s ease;
    height: 8px;
    background: #088ab2;
    border-radius: 4px;
  }
`;

interface Props {
  value: number;
  width?: string;
}

const Progress: FC<Props> = ({ value, width = "100%" }) => {
  return (
    <Styled style={{ width }}>
      <div className="progress" style={{ width: `${value}%` }}></div>
    </Styled>
  );
};

export default Progress;
