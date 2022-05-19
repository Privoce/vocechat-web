import styled from "styled-components";
import Avatar from "../Avatar";
import MicOnIcon from "../../../assets/icons/mic.on.svg?url";
import MicDisabledIcon from "../../../assets/icons/mic.disabled.svg?url";
import soundOnIcon from "../../assets/icons/sound.on.svg?url";
import soundOffIcon from "../../assets/icons/sound.off.svg?url";
const Wrapper = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 padding: 8px;
 gap: 2px;

 width: 226px;
 height: 64px;

 /* Base/White */

 background: #ffffff;
 /* top divider */

 box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.05);

 /* Inside auto layout */

 flex: none;
 order: 1;
 flex-grow: 0;
 .people {
  width: 130px;
  height: 32px;
  flex: none;
  order: 0;
  flex-grow: 0;
  .name {
   font-family: "Inter";
   font-style: normal;
   font-weight: 600;
   font-size: 14px;
   line-height: 20px;
   color: #475467;
  }
 }
 .actions {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: 40px;
  height: 16px;

  flex: none;
  order: 1;
  flex-grow: 0;
 }
`;
export default function user({ id, openMic, openVideo }) {
 return (
  <Wrapper>
   <div className="people">
    <Avatar name={id} />
    <div className="name">丁一</div>
   </div>
   <div className="action">
    <img src={openMic ? MicOnIcon : MicDisabledIcon} alt="mic control" />
    <img src={openVideo ? soundOnIcon : soundOffIcon} alt="mic control" />
   </div>
  </Wrapper>
 );
}
