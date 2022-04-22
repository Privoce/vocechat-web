import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import styled from "styled-components";
const StyledWrapper = styled.div`
  width: 100%;
  position: relative;
  .view {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
const StyledInput = styled.input`
  width: 100%;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);
  border-radius: 4px;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #333;
  padding: 8px;
  outline: none;
  &.higher {
    padding: 12px 8px;
  }
  &.large {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    padding: 10px 14px;
  }
  &.none {
    outline: none;
    border: none;
    background: none;
    box-shadow: none;
  }
  &:disabled {
    color: #78787c;
    background-color: #f9fafb;
  }
  &::placeholder {
    color: #78787c;
  }
  &[type="password"] {
    padding-right: 30px;
  }
`;

export default function Input({ type = "text", ...rest }) {
  const [inputType, setInputType] = useState(type);
  const togglePasswordVisible = () => {
    setInputType((prev) => (prev == "password" ? "text" : "password"));
  };
  return type == "password" ? (
    <StyledWrapper>
      <StyledInput type={inputType} {...rest} />
      <div className="view" onClick={togglePasswordVisible}>
        {inputType == "password" ? (
          <HiEyeOff color="#78787c" />
        ) : (
          <HiEye color="#78787c" />
        )}
      </div>
    </StyledWrapper>
  ) : (
    <StyledInput type={inputType} {...rest} />
  );
}

// export default StyledInput;
