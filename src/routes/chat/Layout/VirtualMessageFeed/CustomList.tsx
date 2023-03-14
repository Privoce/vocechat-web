import { forwardRef } from 'react';

// @ts-ignore
const CustomList = forwardRef(({ style, ...props }, ref) => {
    // @ts-ignore
    return <div style={{ ...style, width: `calc(100% - 2rem)` }} {...props} ref={ref} />;
});


export default CustomList;