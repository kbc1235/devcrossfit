import styled from "styled-components";

export default function Button({
  children,
  type,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset" | "text";
}) {
  return (
    <Btn type={type || "button"} onClick={onClick}>
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
`;
