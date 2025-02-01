import React from 'react';
import styled from 'styled-components';
import { Option } from '../class/Option';

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const SelectBox = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  return (
    <SelectBox value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">選択してください</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </SelectBox>
  );
};

export default Select;
