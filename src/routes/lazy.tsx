import { FC, ReactNode, Suspense } from "react";

import Loading from "@/components/Loading";

type Props = {
  children?: ReactNode;
};

// Note: callers pass a JSX `key="..."` attribute to <LazyIt> — React reserves
// `key` and never forwards it as a prop, so it can't (and shouldn't) be read
// here. React Router already unmounts/remounts on route changes as needed.
const Lazy: FC<Props> = ({ children }) => {
  return <Suspense fallback={<Loading fullscreen={true} context="lazy" />}>{children}</Suspense>;
};

export default Lazy;
