import { useState } from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { Btn } from "../../../components/button";
import ArrowUp from "../../../assets/svg/arrowUp";

export default function MapNav({
  list,
  onClick,
}: {
  list: any;
  onClick: (item: any) => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <MapNavWrapper $isOpen={isOpen}>
      <MapNavInner>
        <NavList>
          {list?.map((item: any) => (
            <ListItem key={item.id} onClick={() => onClick(item)}>
              {item.name}
            </ListItem>
          ))}
        </NavList>
        <Button type="button" onClick={handleOpen} $isOpen={isOpen}>
          {isOpen ? (
            <ArrowUp width={26} fill={theme.colors.white} />
          ) : (
            <ArrowUp width={26} fill={theme.colors.white} />
          )}
        </Button>
      </MapNavInner>
    </MapNavWrapper>
  );
}

const Button = styled(Btn)<{ $isOpen: boolean }>`
  position: absolute;
  width: 40px;
  height: 50px;
  top: 50%;
  right: 0;
  transform: translate(40px, -50%);
  border-radius: 0 6px 6px 0;
  border: solid ${theme.colors.sub2};
  border-width: 1px 1px 1px 0;
  background: ${theme.colors.sub2};
  color: ${theme.colors.main};
  & > svg {
    transform: ${({ $isOpen }) =>
      $isOpen ? "rotate(-90deg)" : "rotate(90deg)"};
    transition: transform 0.3s ease-in-out;
  }
`;
const ListItem = styled.li`
  & + & {
    border-top: 1px solid #e0e0e0;
  }
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.sub2};
  cursor: pointer;
`;
const NavList = styled.ul`
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MapNavInner = styled.div`
  position: relative;
  height: 100%;
`;
const MapNavWrapper = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? "0" : "-300px")};
  transition: left 0.3s ease-in-out;
  width: 100%;
  max-width: 300px;
  height: 100vh;
  background: ${theme.colors.white};
  border-radius: 0 6px 6px 0;
  filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.2));
  z-index: 10001;
`;
