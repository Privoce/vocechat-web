import styled from "styled-components";

const Styled = styled.div`
  max-height: 50vh;
  overflow: auto;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #475467;
  > .box {
    display: flex;
    flex-direction: column;
    gap: 16px;
    p {
      padding: 0;
    }
  }
`;

export default Styled;
