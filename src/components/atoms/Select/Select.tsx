import { useState } from "react";
import styled from "styled-components";

import ArrowDown from "../../../assets/svg/arrowDown";
import ArrowUp from "../../../assets/svg/arrowUp";
import theme from "../../../styles/theme";

type Props = {
  value: string;
  setValue: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({ value, setValue }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const selectValue = (value: string) => {
    setIsOpen(false);
    setValue(value);
  };
  return (
    <SelectWrapper>
      <SelectValue onClick={() => setIsOpen(!isOpen)}>
        {value}
        {isOpen ? (
          <ArrowUp width="26px" height="26px" fill={theme.colors.sub} />
        ) : (
          <ArrowDown width="26px" height="26px" fill={theme.colors.sub} />
        )}
      </SelectValue>
      {isOpen && (
        <SelectList>
          <SelectItem>
            <SelectItemButton onClick={() => selectValue("ALL")}>
              ALL
            </SelectItemButton>
          </SelectItem>
          <SelectItem>
            <SelectItemButton onClick={() => selectValue("M")}>
              M
            </SelectItemButton>
          </SelectItem>
          <SelectItem>
            <SelectItemButton onClick={() => selectValue("F")}>
              F
            </SelectItemButton>
          </SelectItem>
        </SelectList>
      )}
    </SelectWrapper>
  );
}
const SelectValue = styled.div`
  ${theme.common.flexCenter}
  width: 100%;
  max-width: 70px;
  padding: 0.5rem;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.main};
  overflow: hidden;
  svg {
    margin-left: auto;
  }
`;
const SelectList = styled.ul`
  position: absolute;
  right: 1.5rem;
  top: 60px;
  width: 100%;
  max-width: 70px;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.white};
  z-index: 1001;
`;
const SelectItem = styled.li`
  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.sub};
  }
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
const SelectItemButton = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.5rem;
  color: ${theme.colors.main};
`;
const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 0.5rem 1.5rem;
  justify-content: flex-end;
`;
