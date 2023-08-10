import { FC, ReactNode, Suspense } from "react";

import Loading from "@/components/Loading";

type Props = {
  children?: ReactNode;
};

const Lazy: FC<Props> = ({ children }) => {
  return <Suspense fallback={<Loading fullscreen={true} context="lazy" />}>{children}</Suspense>;
};

export default Lazy;
