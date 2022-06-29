import Tippy from "@tippyjs/react";
import { roundArrow } from "tippy.js";
import "tippy.js/dist/svg-arrow.css";
import styled from "styled-components";
import IconQuestion from "../../../assets/icons/question.svg";

const StyledContent = styled.div`
  padding: 8px 12px;
  background: #101828;
  border-radius: 8px;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #ffffff;
  a {
    color: #55c7ec;
  }
`;

export default function Tooltip({ link = "#" }) {
  return (
    <Tippy
      delay={[0, 500]}
      interactive
      arrow={roundArrow}
      placement="bottom"
      content={
        <StyledContent>
          Need more detail? See our{" "}
          <a target={"doc"} href={link}>
            doc
          </a>
          .
        </StyledContent>
      }
    >
      <IconQuestion className="icon" />
    </Tippy>
  );
}
