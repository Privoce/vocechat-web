import { useRef, useState } from "react";
import styled from "styled-components";
import { nanoid } from "@reduxjs/toolkit";

const StyledForm = styled.form`
  > .option {
    &:not(:last-child) {
      margin-bottom: 8px;
    }

    > input[type="radio"] {
      display: none;

      & + .box {
        width: 512px;
        background: #ffffff;
        border: 1px solid #d0d5dd;
        box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
        border-radius: 8px;
        transition: all ease-in-out 250ms;

        & > label {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          color: #667085;
          cursor: pointer;
          user-select: none;
          transition: all ease-in-out 250ms;

          &:before {
            content: "";
            display: inline-block;
            width: 14px;
            height: 14px;
            border-radius: 8px;
            background: #ffffff;
            box-shadow: inset 0 0 0 4px #ffffff;
            border: 1px solid #d0d5dd;
            margin: 14px 8px 14px 14px;
            transition: all ease-in-out 500ms;
          }
        }
      }

      &:checked + .box {
        background: #22ccee;
        border: 1px solid #d0d5dd;

        & > label {
          color: #ffffff;

          &:before {
            background: #ffffff;
            box-shadow: inset 0 0 0 4px #22ccee;
            border: 1px solid #ffffff;
          }
        }
      }
    }
  }
`;

export default function Radio({ options, value = undefined, onChange = undefined }) {
  const [innerValue, setInnerValue] = useState(0);
  const id = useRef(nanoid());

  return (
    <StyledForm>
      {options.map((item, index) => (
        <div className="option" key={index}>
          <input
            type="radio"
            checked={(value !== undefined ? value : innerValue) === index}
            onChange={() => {
              value === undefined && setInnerValue(index);
              onChange !== null && onChange(index);
            }}
            id={`${id.current}-${index}`}
          />
          <div className="box">
            <label htmlFor={`${id.current}-${index}`}>{item}</label>
          </div>
        </div>
      ))}
    </StyledForm>
  );
}
