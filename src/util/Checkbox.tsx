// CheckboxGroup.tsx
import React from 'react';

interface Option {
  id: string;
  name: string;
}

interface CheckboxGroupProps {
  options: Option[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedValues,
  onChange,
}) => {
  const handleCheckboxChange = (id: string) => {
    const newSelectedValues = selectedValues.includes(id)
      ? selectedValues.filter((value) => value !== id)
      : [...selectedValues, id];
    onChange(newSelectedValues);
  };

  return (
    <div>
      {options.map((option) => (
        <div key={option.id}>
          <input
            type="checkbox"
            id={option.id}
            value={option.id}
            checked={selectedValues.includes(option.id)}
            onChange={() => handleCheckboxChange(option.id)}
          />
          <label htmlFor={option.id}>{option.name}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
