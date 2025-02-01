// CheckboxGroup.tsx
import React from 'react';
import styled from 'styled-components';
import { Option } from '../class/Option';

interface CheckboxGroupProps {
  options: Option[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
}


const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CheckboxBlock = styled.div`
  display: flex;
  gap: 10px;
  margin-right: 10px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  margin-right: 2px;
`;


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
    <>
    <CheckboxContainer>
      {options.map((option: Option) => (
        <CheckboxBlock key={option.id}>
          <CheckboxInput
            type="checkbox"
            id={option.id}
            value={option.id}
            checked={selectedValues.includes(option.id)}
            onChange={() => handleCheckboxChange(option.id)}
          />
          <CheckboxLabel htmlFor={option.id}>{option.name}</CheckboxLabel>
        </CheckboxBlock>
      ))}
    </CheckboxContainer>
    </>
  );
};

export default CheckboxGroup;
