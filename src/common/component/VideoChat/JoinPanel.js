import styled from 'styled-components';
export const StyledJoiningChat = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-content: center;
 align-items: center;
 width: 226px;
 height: calc(100vh - 56px - 22px);
 .title {
  font-size: 16px;
  line-height: 24px;
  color: #1c1c1e;
  font-weight: 600;
 }
`;
export default function JoinPanel() {
    return (
        <>
            <StyledJoiningChat>
                <div>Connecting to voice room...</div>
            </StyledJoiningChat>
        </>
    );
}