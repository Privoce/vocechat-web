import { FC, ReactElement } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Tippy from "@tippyjs/react";
import { Placement, roundArrow } from "tippy.js";
import "tippy.js/dist/svg-arrow.css";
import { updateUserGuide } from "../../../app/slices/ui";
import steps from "./steps";
import { useAppDispatch } from "../../../app/store";

const Styled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: #06aed4;
  border-radius: var(--br);
  box-shadow: 0 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
  color: #ffffff;
  min-width: 362px;
  .title {
    font-weight: 700;
    font-size: 20px;
    line-height: 30px;
    margin-bottom: 4px;
  }
  .desc {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 24px;
  }
  .btns {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    button {
      cursor: pointer;
      color: inherit;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      border: none;
      background: none;
      &.skip {
        font-weight: 400;
      }
      &.next {
        background: rgba(0, 0, 0, 0.16);
        padding: 8px 14px;
        border-radius: var(--br);
      }
    }
  }
`;
const OverrideTippyArrowColor = createGlobalStyle`
.user-guide-tippy .tippy-svg-arrow svg path{
    fill:#06aed4 ;
}
`;

interface Props {
  step?: number;
  placement: Placement;
  delay?: number | [number | null, number | null];
  children: ReactElement;
}

const UserGuide: FC<Props> = ({ step = 1, placement = "right-start", delay, children }) => {
  const dispatch = useAppDispatch();
  const currStep = steps[step - 1];
  const isLastStep = steps.length == step;
  //   if (!visible) return children;
  if (!currStep) return null;
  const { title, description } = currStep;
  const defaultDuration: [number, number] = [300, 250];
  const handleSkip = () => {
    // to do
    dispatch(updateUserGuide({ visible: false }));
  };
  const handleNext = () => {
    dispatch(updateUserGuide({ step: step + 1 }));
  };
  return (
    <>
      <OverrideTippyArrowColor />
      <Tippy
        interactive
        className="user-guide-tippy"
        arrow={roundArrow}
        visible={true}
        offset={[0, 18]}
        duration={delay ? defaultDuration : 0}
        delay={delay ?? [150, 0]}
        placement={placement}
        content={
          <Styled>
            <h4 className="title">{title}</h4>
            <p className="desc">{description}</p>
            <div className="btns">
              <button className="skip" onClick={handleSkip}>
                Skip
              </button>
              <button className="next" onClick={handleNext}>
                {isLastStep ? `Done` : `Next Step`}
              </button>
            </div>
          </Styled>
        }
      >
        {children}
      </Tippy>
    </>
  );
};

export default UserGuide;
