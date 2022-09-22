import { useEffect } from "react";
import styled from "styled-components";
import { useLazyGetGeneratedLicenseQuery } from "../../app/services/server";
import useLicense from "../../common/hook/useLicense";
import Button from "../../common/component/styled/Button";
import checkIcon from "../../assets/icons/check.png";
import { useNavigate } from "react-router-dom";
const Styled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  width: 512px;
  background: #f3f4f6;
  border-radius: 20px;
  .check {
    width: 120px;
    height: 120px;
  }
  .head {
    font-weight: bold;
    font-size: 32px;
    padding-top: 20px;
  }
  .desc {
    font-size: 18px;
    color: #999;
    padding: 0 0 30px 0;
  }
`;

type Props = {
  sid: string;
};

const PaymentSuccess = ({ sid }: Props) => {
  const navigateTo = useNavigate();
  const { upsertLicense, upserting, upserted } = useLicense();
  const [getGeneratedLicense, { data, isError, isLoading, isSuccess }] =
    useLazyGetGeneratedLicenseQuery();
  useEffect(() => {
    if (sid) {
      getGeneratedLicense(sid);
    }
  }, [sid]);
  useEffect(() => {
    if (isSuccess && data) {
      const l = data.license;
      upsertLicense(l);
    }
  }, [data, isSuccess]);
  const handleBack = () => {
    navigateTo("/");
  };
  return (
    <Styled>
      <img className="check" src={checkIcon} alt="check icon" />
      <h1 className="head">Payment Success!</h1>
      <p className="desc">
        {upserting ? "Renewing the License, do not close the window!" : ""}
        {upserted ? "Renew the License Successfully!" : ""}
        {isError ? "Invalided Stripe Session ID" : ""}
      </p>
      <Button disabled={isLoading || upserting} className="back" onClick={handleBack}>
        Back Home
      </Button>
    </Styled>
  );
};

export default PaymentSuccess;
