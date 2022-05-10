// import React from "react";
import Button from "../../common/component/styled/Button";
export default function SentTip({ email, reset }) {
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
}
