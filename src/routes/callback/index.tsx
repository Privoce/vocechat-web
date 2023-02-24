import { DOMAttributes, ReactNode } from "react";
import { useParams } from "react-router-dom";
import PaymentSuccess from "./PaymentSuccess";
import GithubCallback, { GithubLoginSource } from "./GithubCallback";

const StyledWrapper = ({ children }: DOMAttributes<HTMLDivElement> & { children?: ReactNode }) => {

  return <div className="flex-center dark:bg-gray-700 dark:text-white w-screen h-screen break-words leading-normal">
    {children}
  </div>;
};
// type Props = {
//   type: "payment_success";
// };
// 该页面服务于一些第三方服务的回调，比如stripe付款成功的回调，GitHub登录成功的回调
export default function CallbackPage() {
  const { type = "", payload = "" } = useParams();
  // stripe 付款成功
  if (type == "payment_success") {
    return (
      <StyledWrapper>
        <PaymentSuccess sid={payload} />
      </StyledWrapper>
    );
  }
  // github授权成功
  if (type == "github") {
    const query = new URLSearchParams(location.search);
    const code = query.get("code") ?? "";
    return (
      <StyledWrapper>
        <GithubCallback code={code} from={payload as GithubLoginSource} />
      </StyledWrapper>
    );
  }
  return <StyledWrapper>callback page</StyledWrapper>;
}
