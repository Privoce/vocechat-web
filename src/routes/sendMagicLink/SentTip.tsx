import Button from "../../common/component/styled/Button";
import { FC, MouseEvent } from "react";

interface Props {
  email: string;
  reset?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SentTip: FC<Props> = ({ email, reset }) => {
  return (
    <div className="tips">
      <h2 className="title">Check your email</h2>
      <span className="desc">
        We’ve sent you a magic link to {email}. Click on the link to continue.
      </span>
      <Button onClick={reset} className="main flex">
        Use a different email
      </Button>
    </div>
  );
};

export default SentTip;
