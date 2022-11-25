import { PropsWithChildren, Suspense } from 'react';
import Loading from "../common/component/Loading";
type Props = {}

const Lazy = ({ children }: PropsWithChildren<Props>) => {
    return (
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    );
};

export default Lazy;