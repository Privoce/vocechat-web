import styled from "styled-components";
import StyledInput from "../../../common/component/styled/Input";

const StyledAdminCredentialsStep = styled.div`
 height: 100%;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;

 > .input:not(:last-child) {
  margin-bottom: 20px;
 }
`;

export default function AdminCredentialsStep({ data, setData }) {
 return (
  <StyledAdminCredentialsStep>
   <span className="primaryText">Now let’s set up your admin account</span>
   <span className="secondaryText">You are the 1st user and admin of your space!</span>
   <StyledInput
    className="input"
    placeholder="Enter your email"
    value={data.adminEmail}
    onChange={(e) =>
     setData({
      ...data,
      adminEmail: e.target.value
     })
    }
   />
   <StyledInput
    className="input"
    type="password"
    placeholder="Enter your password"
    value={data.adminPassword}
    onChange={(e) =>
     setData({
      ...data,
      adminPassword: e.target.value
     })
    }
   />
   <StyledInput
    className="input"
    type="password"
    placeholder="Confirm your password"
    value={data.adminPassword2}
    onChange={(e) =>
     setData({
      ...data,
      adminPassword2: e.target.value
     })
    }
   />
  </StyledAdminCredentialsStep>
 );
}
