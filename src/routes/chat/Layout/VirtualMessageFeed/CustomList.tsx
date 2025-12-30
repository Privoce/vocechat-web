const CustomList = ({ style, ref, ...props }: any) => {
  return <div style={{ ...style, width: `calc(100% - 2rem)` }} {...props} ref={ref} />;
};

export default CustomList;
