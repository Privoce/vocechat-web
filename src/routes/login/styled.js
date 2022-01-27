import styled from 'styled-components';
const StyledWrapper = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 height: 100vh;
 .form{
     padding: 30px 15px;
     border: 1px solid #eee;
     form{
         display: flex;
         flex-direction: column;
         gap: 5px;
         input{
             padding:4px 6px
             
         }
     }
 }
`;

export default StyledWrapper;
