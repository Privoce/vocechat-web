import styled from "styled-components";
const StyledWrapper = styled.div`
  display: flex;
  height: 100%;
  > .left {
    display: flex;
    flex-direction: column;
    width: 260px;
    box-shadow: inset -1px 0px 0px rgba(0, 0, 0, 0.1);
    .list {
      margin: 12px 8px;
      .title {
        padding: 0 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 4px;
        cursor: pointer;
        > .txt {
          user-select: none;
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: bold;
          font-size: 12px;
          line-height: 20px;
          color: #78787c;
        }
      }
      > .nav {
        display: flex;
        flex-direction: column;
        gap: 4px;
        a {
          text-decoration: none;
        }
        .link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px;
          border-radius: 4px;
          &:hover,
          &.active {
            background: rgba(116, 127, 141, 0.1);
          }
          > .txt {
            display: flex;
            align-items: center;
            gap: 5px;
            color: #1c1c1e;
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
          }
          > .badge {
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 20px;
            min-width: 20px;
            border-radius: 50%;
            background: #bfbfbf;
            font-weight: 900;
            font-size: 10px;
            line-height: 10px;
            &.dot {
              width: 6px;
              height: 6px;
              padding: 0;
            }
          }
        }
        .session {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 4px 8px;
          border-radius: 4px;
          &:hover,
          &.active {
            background: rgba(116, 127, 141, 0.1);
          }
          .avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            /* img{
              width: 100%;
            } */
          }
          .details {
            display: flex;
            flex-direction: column;
            width: 100%;
            .up {
              display: flex;
              justify-content: space-between;
              .name {
                font-weight: 600;
                font-size: 14px;
                line-height: 20px;
                color: #52525b;
              }
              time {
                font-weight: 500;
                font-size: 12px;
                line-height: 18px;
                color: #78787c;
              }
            }
            .down {
              display: flex;
              justify-content: space-between;
              .msg {
                font-weight: normal;
                font-size: 12px;
                line-height: 18px;
                color: #78787c;
                white-space: nowrap;
                overflow: hidden;
                width: 140px;
                text-overflow: ellipsis;
              }
              > .badge {
                /* letter-spacing: -1px; */
                /* padding: 2px; */
                color: #fff;
                height: 20px;
                min-width: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 10px;
                background: #1fe1f9;
                font-weight: 900;
                font-size: 10px;
                line-height: 10px;
                &.mute {
                  background: #bfbfbf;
                }
              }
            }
          }
        }
      }
    }
  }
  > .right {
    width: 100%;
  }
`;

export default StyledWrapper;
