import styled from "styled-components";
const Styled = styled.div`
  height: 100vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  background-color: #fff;
  margin: 8px 24px 10px 0;
  border-radius: 16px;
  padding: 16px;
  .fav {
    display: flex;
    flex-direction: column;
    .tip {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: #bfbfbf;
    }
  }
`;

export default Styled;
