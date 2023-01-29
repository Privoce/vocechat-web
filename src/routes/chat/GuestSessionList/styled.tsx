import styled from "styled-components";
const Styled = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px;
  height: calc(100vh - 56px - 16px - 8px);
  overflow: auto;
  > .session {
    > a {
      display: flex;
      gap: 8px;
      border-radius: 8px;
      padding: 8px;
      width: 100%;
      &.active,
      &:hover {
        background: rgba(116, 127, 141, 0.2);
      }
      .icon {
        display: flex;
        background-color: #eee;
        border-radius: 50%;
        img {
          max-width: unset;
          width: 40px;
          height: 40px;
          &.channel_default {
            padding: 5px;
          }
        }
      }
      .details {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .up {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .name {
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            color: #52525b;
            max-width: 112px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &.only_title {
              max-width: 190px;
            }
          }
          .time {
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
            color: #78787c;
            white-space: nowrap;
            overflow: hidden;
            max-width: 80px;
            text-overflow: ellipsis;
          }
        }
        .down {
          display: flex;
          align-items: center;
          justify-content: space-between;
          > .msg {
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            color: #78787c;
            white-space: nowrap;
            overflow: hidden;
            width: 140px;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
`;

export default Styled;
