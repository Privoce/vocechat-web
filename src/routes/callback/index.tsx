import { useParams } from "react-router-dom";
import PaymentSuccess from "./PaymentSuccess";
import StyledWrapper from "./styled";
// type Props = {
//   type: "payment_success";
// };
// 该页面服务于一些第三方服务的回调，比如stripe付款成功的回调
export default function CallbackPage() {
  const { type = "", payload = "" } = useParams();
  if (type == "payment_success") {
    return (
      <StyledWrapper>
        <PaymentSuccess sid={payload} />
      </StyledWrapper>
    );
  }
  return <StyledWrapper>callback page</StyledWrapper>;
}
