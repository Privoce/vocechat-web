import clsx from 'clsx';

type Props = {
  thin?: boolean
};

const Index = ({ thin = false }: Props) => {
  const h = thin ? 'h-[1px]' : 'h-0.5';
  return (
    <hr className={clsx('w-full bg-gray-300 border-none', h)} />
  );
};

export default Index;
