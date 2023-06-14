import React, { FC } from 'react';
import { PickerProps } from '../types';
import clsx from 'clsx';

interface Item {
  id: string;
  name: string;
}

interface Props extends PickerProps<Item> {
  onPick: (index: number) => void;
}

const Index: FC<Props> = ({ open, loading, current, items, onPick }) => {
  if (!open || items.length === 0) return null;

  return (
    <div className="bg-content shadow-2xl rounded-lg border-primary w-60">
      {items.map((s, i) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onPick(i)}
          className={clsx(
            'flex items-center h-8 px-4 text-color-primary hover-gray w-full',
            i === current ? 'bg-gray-100 dark:bg-gray-700' : ''
          )}
        >
          {s.name}
        </button>
      ))}
    </div>
  );
};

export default Index;
