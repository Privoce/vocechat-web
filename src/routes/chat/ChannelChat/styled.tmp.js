import styled from "styled-components";
export const StyledHeader = styled.header`
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
  height: calc(100vh - 56px - 22px);
  overflow-y: scroll;
  padding: 8px;
  box-shadow: inset 1px 0px 0px rgba(0, 0, 0, 0.1);
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
  padding: 18px 16px;
  width: 100%;
  height: 100%;
  height: -webkit-fill-available;
  overflow-x: hidden;
  overflow-y: auto;
  transform: rotate(180deg) translateZ(0);
  direction: rtl;
  /* display: flex;
  flex-direction: column-reverse; */
  > div,
  > hr {
    direction: ltr;
    transform: rotate(180deg);
  }
  > .info {
    padding-top: 62px;
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
      display: flex;
      align-items: center;
      gap: 4px;
      .icon {
        width: 16px;
        height: 16px;
        path {
          fill: #3c8ce7;
        }
      }
      padding: 0;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      background: linear-gradient(135deg, #3c8ce7 0%, #00eaff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }
  /* > .feed {
  } */
`;
