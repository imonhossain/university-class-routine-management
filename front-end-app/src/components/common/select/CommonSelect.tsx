/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import Select from 'react-select';

type MenuPlacement = 'bottom' | 'top';

interface Props {
  options: any[];
  value: any;
  onChange: (option: any) => void;
  getOptionLabel: (option: any) => string;
  getOptionValue: (option: any) => any;
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
        onChange={(selected) => onChange(selected)}
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
