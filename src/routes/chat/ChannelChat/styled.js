import styled from "styled-components";
export const StyledHeader = styled.header`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .txt {
    display: flex;
    align-items: center;
    gap: 5px;
    .title {
      font-size: 16px;
      line-height: 24px;
      color: #1c1c1e;
    }
    .desc {
      margin-left: 8px;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #616161;
    }
  }
  .opts {
    display: flex;
    align-items: center;
    gap: 16px;
    .opt {
      cursor: pointer;
      width: 24px;
      height: 24px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
export const StyledNotification = styled.div`
  padding: 3px 8px;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #fff;
  position: absolute;
  top: 0;
  left: 10px;
  width: 900px;
  height: 24px;
  background: linear-gradient(135deg, #3c8ce7 0%, #00eaff 100%);
  border-radius: 0px 0px 8px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .clear {
    cursor: pointer;
    color: inherit;
    border: none;
    background: none;
    outline: none;
  }
`;
export const StyledContacts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  /* todo */
  width: 226px;
  height: calc(100vh - 56px);
  overflow-y: scroll;
  background: #f5f6f7;
  padding: 8px;
  > .add {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    padding: 10px;
    border-radius: 8px;
    user-select: none;
    &:hover {
      background: rgba(116, 127, 141, 0.1);
    }
    .icon {
      width: 24px;
      height: 24px;
    }
    .txt {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #52525b;
    }
  }
`;
export const StyledChannelChat = styled.article`
  position: relative;
  width: 100%;
  /* margin-bottom: 120px; */
  > .wrapper {
    display: flex;
    flex-direction: column;
    padding: 0;
    padding-bottom: 10px;
    height: calc(100vh - 56px);
    .chat {
      padding: 18px 16px;
      height: 100%;
      height: -webkit-fill-available;
      overflow: auto;
      > .info {
        padding-top: 114px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        .title {
          font-weight: bold;
          font-size: 36px;
          line-height: 44px;
        }
        .desc {
          color: #78787c;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
        }
        .edit {
          color: #3c8ce7;
          padding: 0;
          border: none;
          outline: none;
          background: none;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
        }
      }
      > .feed {
        /* display: flex;
        flex-direction: column-reverse; */
      }
    }
    > .send {
      margin: 0 16px;
    }
  }
`;
