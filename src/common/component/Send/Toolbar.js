// import React from 'react'
import { RiMarkdownLine, RiMarkdownFill } from "react-icons/ri";
import styled from "styled-components";
import Button from "../styled/Button";
import EmojiPicker from "./EmojiPicker";
import addIcon from "../../../assets/icons/add.svg?url";
const Styled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
  .left {
    display: flex;
    align-items: center;
    gap: 8px;
    .md {
      cursor: pointer;
    }
    .add {
      cursor: pointer;
      position: relative;
      width: 16px;
      height: 16px;
      input {
        opacity: 0;
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .emoji {
      position: relative;
      .toggle {
        font-size: 22px;
        border: none;
        background: none;
      }
      .picker {
        position: absolute;
        top: -20px;
        right: -15px;
        transform: translateY(-100%);
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    gap: 8px;
    .send {
      /* font-size: 16px;
      font-weight: bold;
      background: none; */
    }
  }
  .divider {
    width: 1px;
    height: 16px;
    background-color: #ccc;
    margin: 0 4px;
  }
`;
export default function Toolbar({
  contentType = "text",
  updateContentType,
  handleUpload,
  selectEmoji,
  handleSend,
}) {
  const toggleMarkdown = () => {
    updateContentType(contentType == "markdown" ? "text" : "markdown");
  };
  return (
    <Styled>
      <div className="left">
        <div className="add">
          <img src={addIcon} />
          <input
            multiple={true}
            onChange={handleUpload}
            type="file"
            name="file"
            id="file"
          />
        </div>
        <div className="divider"></div>
        <div className="emoji">
          <EmojiPicker selectEmoji={selectEmoji} />
        </div>
        <div className="md" onClick={toggleMarkdown}>
          {contentType == "markdown" ? (
            <RiMarkdownFill size={24} />
          ) : (
            <RiMarkdownLine size={24} />
          )}
        </div>
      </div>
      <div className="right">
        {contentType == "markdown" && (
          <Button className="send main" onClick={handleSend}>
            Send
          </Button>
        )}
      </div>
    </Styled>
  );
}
