import styled from "styled-components";

const Selector = styled.div`
  color: #475467;
  background: #ffffff;
  border: 1px solid #f2f4f7;
  box-shadow: 0px 24px 48px -12px rgba(16, 24, 40, 0.18);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  .title {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 18px;
    color: #1d2939;
  }
  .radioBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .radio {
    padding: 8px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #475467;
    width: 281px;
    height: 36px;
    text-align: left;
  }
`;
export default function DeviceSelector({ type, devices, handleClick }) {
  return (
    <Selector>
      <div className="title">
        {type == "microphone"
          ? "Microphone".toUpperCase()
          : "Camera".toUpperCase()}
      </div>
      <div className="radioBox">
        {devices.map((device) => {
          return (
            <div
              key={device.deviceId}
              className="radio"
              onClick={() => handleClick(device.deviceId)}
            >
              {device.label}
            </div>
          );
        })}
      </div>
    </Selector>
  );
}
