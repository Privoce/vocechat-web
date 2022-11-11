import { FC } from 'react';
import { useAppSelector } from '../../app/store';
import IconClose from './close.svg';

type Props = {
  handleClose: () => void;
};

const Index: FC<Props> = ({ handleClose }) => {
  const { name, logo } = useAppSelector(store => store.server);
  return (
    <header className="relative flex justify-between items-center h-14 px-4 bg-[#1fe1f9]">
      <div className="relative w-8 h-8">
        <img src={logo} alt="logo" className="w-full h-full rounded-full" />
      </div>
      <div className="flex-1 px-4 pr-2 text-lg">
        <span className="text-lg font-bold truncate text-gray-50">{name}</span>
      </div>
      <button type='button' className='w-6 h-6'>

        <IconClose onClick={handleClose} />
      </button>
    </header>
  );
};

export default Index;
