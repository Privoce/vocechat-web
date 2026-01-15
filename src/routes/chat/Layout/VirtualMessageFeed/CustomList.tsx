const CustomList = ({ style, ref, ...props }: any) => {
  return (
    <div
      style={{
        ...style,
        width: `calc(100% - 2rem)`,
        // CSS performance hint for better scrolling performance
        // Note: avoid 'contain' as it interferes with ResizeObserver in virtuoso
        willChange: 'transform'
      }}
      {...props}
      ref={ref}
    />
  );
};

export default CustomList;
