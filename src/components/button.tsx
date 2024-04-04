import styled from "styled-components";

export default function Button({
  children,
  type,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | "text";
  disabled?: boolean;
}) {
  return (
    <Btn type={type || "button"} onClick={onClick} disabled={disabled}>
      {children}
    </Btn>
  );
}

export const Btn = styled.button<{ type: string }>`
  color: #222;
  font-size: 16px;
  ${({ type }) =>
    type === "text" &&
    `
    border: none;
    background-color: transparent;
  `}
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    &:hover {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;
