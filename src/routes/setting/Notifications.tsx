import styled from "styled-components";
import useNotification from "../../common/hook/useNotification";
import StyledToggle from "../../common/component/styled/Toggle";
import Label from "../../common/component/styled/Label";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Notifications() {
  const { status, enableNotification } = useNotification();
  const handleEnableNotify = () => {
    if (status !== "granted") {
      enableNotification();
    }
  };

  return (
    <StyledWrapper>
      <Label>Notification Setting:</Label>
      <StyledToggle data-checked={status == "granted"} onClick={handleEnableNotify} />
    </StyledWrapper>
  );
}
