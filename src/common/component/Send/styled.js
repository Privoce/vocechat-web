import styled from "styled-components";

const StyledSend = styled.div`
  position: relative;
  background: #e5e7eb;
  border-radius: var(--br);
  width: 100%;
  /* min-height: 54px; */
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 15px;
  padding: 14px 18px;
  /* margin: 0 16px; */
  &.reply {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .input {
    width: 100%;
    /* padding: 4px 0; */
  }
`;

export default StyledSend;
