import React, { FC } from 'react';
import clsx from 'clsx';

interface Suggestion {
  id: string;
  name: string;
}

interface Props {
  index: number;
  loading?: boolean;
  suggestions: Suggestion[];
  onSelect: (index: number) => void;
}

const Index: FC<Props> = ({ index, loading, suggestions, onSelect }) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="bg-content shadow-2xl rounded-lg border-primary w-60">
      {suggestions.map((s, i) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onSelect(i)}
          className={clsx(
            'flex items-center h-8 px-4 text-color-primary hover-gray w-full',
            i === index ? 'bg-gray-100 dark:bg-gray-700' : ''
          )}
        >
          {s.name}
        </button>
      ))}
    </div>
  );
};

export default Index;
