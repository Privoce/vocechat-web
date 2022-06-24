import styled from "styled-components";

const Styled = styled.ul`
  width: 100%;
  overflow: auto;
  display: flex;
  justify-content: flex-start;
  gap: 24px;
  padding: 24px 16px 16px 16px;
  background: #e5e7eb;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
  border-radius: 8px 8px 0 0;
  .file {
    position: relative;
    display: flex;
    flex-direction: column;

    background: #fcfcfd;
    border-radius: 4px;
    padding: 8px;
    .preview {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 160px;
      height: 160px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .name {
      width: 160px;
      margin: 16px 0 2px 0;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #1c1c1e;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .size {
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
      color: #616161;
    }
    .opts {
      visibility: hidden;
      background: inherit;
      border: 1px solid rgba(0, 0, 0, 0.08);
      box-sizing: border-box;
      border-radius: 6px;
      display: flex;
      align-items: center;
      position: absolute;
      right: -20px;
      top: -10px;
      .opt {
        padding: 4px;
        cursor: pointer;
      }
    }
    &:hover .opts {
      visibility: visible;
    }
  }
`;

export default Styled;
