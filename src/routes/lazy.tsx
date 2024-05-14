import { FC, ReactNode, Suspense } from "react";

import Loading from "@/components/Loading";

type Props = {
  key?: string;
  children?: ReactNode;
};

const Lazy: FC<Props> = ({ key, children }) => {
  return (
    <Suspense
      key={key ?? new Date().getTime()}
      fallback={<Loading fullscreen={true} context="lazy" />}
    >
      {children}
    </Suspense>
  );
};

export default Lazy;
