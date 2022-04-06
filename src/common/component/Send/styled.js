import styled from "styled-components";

const StyledSend = styled.div`
  position: relative;
  background: #e5e7eb;
  border-radius: var(--br);
  width: 100%;
  width: -webkit-fill-available;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  padding: 14px 18px;
  &.markdown {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 0;
    .input {
      grid-column: span 2;
    }
  }
  &.reply {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .input {
    width: 100%;
  }
`;

export default StyledSend;
