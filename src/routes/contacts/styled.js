import styled from "styled-components";
const StyledWrapper = styled.div`
  display: flex;
  height: 100%;
  > .left {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 260px;
    box-shadow: inset -1px 0px 0px rgba(0, 0, 0, 0.1);
    .list {
      margin: 12px 8px;
      overflow: scroll;
      padding-bottom: 50px;
      > .nav {
        display: flex;
        flex-direction: column;
        gap: 4px;
        a {
          text-decoration: none;
        }
        .session {
          &:hover,
          &.active {
            background: rgba(116, 127, 141, 0.1);
          }
        }
      }
    }
  }
  .right {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
`;

export default StyledWrapper;
