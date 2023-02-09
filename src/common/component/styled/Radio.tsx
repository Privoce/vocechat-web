import { useState, useId, FC } from "react";

type Props = {
  options: string[];
  values: (string | number)[];
  defaultValue?: string | number;
  onChange?: (param: any) => void;
  value: number | string;
};

const VALUE_NOT_SET = "";
const VALUES_NOT_SET: string[] = [];

const Radio: FC<Props> = ({
  options,
  values = VALUES_NOT_SET,
  value = VALUE_NOT_SET,
  defaultValue = "",
  onChange = undefined
}) => {
  const id = useId();

  const [fallbackValue, setFallbackValue] = useState(defaultValue);
  const _value = value !== VALUE_NOT_SET ? value : fallbackValue;
  return (
    <form className="w-full flex flex-col gap-2">
      {options.map((item, index) => (
        <div className="relative bg-transparent" key={index}>
          <input
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer peer z-50"
            type="radio"
            checked={(values !== VALUES_NOT_SET ? values.indexOf(_value) : _value) === index}
            onChange={() => {
              const valueToSet = values === VALUES_NOT_SET ? index : values[index];
              // Set fallback value if not in controlled mode
              if (value === VALUE_NOT_SET) {
                setFallbackValue(valueToSet);
              }
              // Invoke `onChange` handler if defined
              if (onChange) {
                onChange(valueToSet);
              }
            }}
            id={`${id}-${index}`}
          />
          <div className="drop-shadow-sm px-2 py-3 border border-solid border-gray-300 dark:border-gray-400 rounded-lg w-full h-full bg-white dark:bg-gray-800 peer-checked:bg-primary-400 text-sm text-gray-500 dark:text-gray-300  peer-checked:text-white">
            <label className="ml-6" htmlFor={`${id}-${index}`}>{item}</label>
          </div>
          <div className="absolute top-1/2 left-3 -translate-y-1/2 w-3.5 h-3.5 rounded-full border border-solid border-gray-300 peer-checked:hidden"></div>
          <div className="absolute top-1/2 left-3 -translate-y-1/2 w-3.5 h-3.5 rounded-full border border-solid border-white invisible peer-checked:visible flex-center">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      ))}
    </form>
  );
};
export default Radio;
