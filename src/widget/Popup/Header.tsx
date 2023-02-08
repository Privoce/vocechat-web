import { FC } from 'react';
import { useAppSelector } from '../../app/store';
import { useTheme } from '../ThemeContext';
import IconClose from './close.svg';

type Props = {
  handleClose: () => void;
};

const Index: FC<Props> = ({ handleClose }) => {
  const { color, fgColor } = useTheme();
  const { name, logo } = useAppSelector(store => store.server);
  return (
    <header className="relative flex justify-between items-center h-14 px-4" style={{ backgroundColor: color }}>
      <div className="relative w-8 h-8">
        <img src={logo} alt="logo" className="w-full h-full rounded-full" />
      </div>
      <div className="flex-1 px-4 pr-2 text-lg">
        <span className="text-lg font-bold truncate text-gray-50" style={{ color: fgColor }}>{name}</span>
      </div>
      <button type='button' className='w-6 h-6'>

        <IconClose onClick={handleClose} className={fgColor == "black" ? `fill-black` : "fill-white"} />
      </button>
    </header>
  );
};

export default Index;
