import styled from "styled-components";

export default function Input({
  type,
  onChange,
  value,
  placeholder,
  readOnly,
}: {
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  readOnly?: boolean;
}) {
  return (
    <InputCustom
      type={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  );
}

export const InputCustom = styled.input`
  width: 100%;
  padding: 10px 20px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 16px;
  &:focus {
    outline: none;
  }
  & + & {
    margin-top: 6px;
  }
`;
