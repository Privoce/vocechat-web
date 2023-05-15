import { ReactNode, Suspense, FC } from "react";
import Loading from "@/components/Loading";

type Props = {
  children?: ReactNode;
}

const Lazy: FC<Props> = ({ children }) => {
  return (
    <Suspense fallback={<Loading fullscreen={true} />}>
      {children}
    </Suspense>
  );
};

export default Lazy;
