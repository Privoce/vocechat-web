import {
  useState,
  FC,
  DetailedHTMLProps,
  InputHTMLAttributes
} from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);

  .prefix {
    padding: 8px 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #9ca3af;
    background: #f3f4f6;
    border-right: 1px solid #e5e7eb;
  }

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

  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #333;
  padding: 8px;
  outline: none;

  &:not(.inner) {
    border-radius: 4px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);
  }

  &.large {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    padding: 11px 8px;
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
    color: #d1d5db;
  }

  &[type="password"] {
    padding-right: 30px;
  }
`;

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  prefix?: string;
}

const Input: FC<Props> = ({ type = 'text', prefix = '', className, ...rest }) => {
  const [inputType, setInputType] = useState(type);
  const togglePasswordVisible = () => {
    setInputType((prev) => (prev == 'password' ? 'text' : 'password'));
  };

  return type == 'password' ? (
    <StyledWrapper className={className}>
      <StyledInput type={inputType} className={`inner ${className}`} {...rest} />
      <div className="view" onClick={togglePasswordVisible}>
        {inputType == 'password' ? <HiEyeOff color="#78787c"/> : <HiEye color="#78787c"/>}
      </div>
    </StyledWrapper>
  ) : prefix ? (
    <StyledWrapper className={className}>
      <span className="prefix">{prefix}</span>
      <StyledInput className={`inner ${className}`} type={inputType} {...rest} />
    </StyledWrapper>
  ) : (
    <StyledInput type={inputType} className={className} {...rest} />
  );
};

export default Input;
