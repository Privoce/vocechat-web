import {  ReactNode, Suspense, FC } from "react";
import Loading from "../common/component/Loading";

type Props = {
  children?: ReactNode;
}

const Lazy: FC<Props> = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  );
};

export default Lazy;
