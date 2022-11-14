/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import Select, { SingleValue } from 'react-select';

type MenuPlacement = 'bottom' | 'top';

interface Props {
  options: Object[];
  value: Object;
  onChange: (option: SingleValue<Object>) => void;
  getOptionLabel: (option: SingleValue<Object>) => string;
  getOptionValue: (option: SingleValue<Object>) => string;
  menuPlacement?: MenuPlacement;
  className?: string;
  label?: string;
  isDisabled?: boolean;
  isClearable?: boolean;
}
const CommonSelect: FC<Props> = ({
  options,
  onChange,
  value,
  getOptionLabel,
  getOptionValue,
  menuPlacement = 'bottom',
  className = '',
  label = '',
  isDisabled = false,
  isClearable = false,
}) => {
  return (
    <div className="relative">
      <span className="absolute top-[-8px] left-[13px] z-20 text-[11px] bg-white">
        {label}
      </span>
      <Select
        className={`flarie-select ${className}`}
        classNamePrefix="flarie"
        value={value}
        onChange={(selected: SingleValue<Object>) => onChange(selected)}
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        menuPlacement={menuPlacement}
        isDisabled={isDisabled}
        isClearable={isClearable}
      />
    </div>
  );
};

export default CommonSelect;
