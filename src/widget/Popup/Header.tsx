import { FC } from 'react';
import { useAppSelector } from '../../app/store';
import IconClose from './close.svg';

type Props = {
  handleClose: () => void;
};

const Index: FC<Props> = ({ handleClose }) => {
  const { name, description, logo } = useAppSelector(store => store.server);
  return (
    <div className="flex gap-2 justify-between items-center p-2">
      <div className="relative w-12 h-12">
        <img src={logo} alt="logo" className="w-full h-full rounded-full" />
      </div>
      <div className="flex flex-col flex-1">
        <span className="text-gray-900 text-lg font-bold">{name}</span>
        {description && <span className="text-gray-400 text-sm">{description}</span>}
      </div>
      <IconClose className="w-5 h-5 mr-2 cursor-pointer" onClick={handleClose} />
    </div>
  );
};

export default Index;
