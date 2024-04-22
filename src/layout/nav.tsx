import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import theme from "../styles/theme";

import HomeIcon from "../assets/svg/home";
import MarkerIcon from "../assets/svg/marker";
import AddIcon from "../assets/svg/add";
import ChartIcon from "../assets/svg/chart";

export default function Nav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const active = (path: string) => {
    return pathname === path ? true : false;
  };
  return (
    <NavWrapper>
      <NavButton onClick={() => navigate("/")}>
        <HomeIcon
          width={24}
          height={24}
          fill={active("/") ? theme.colors.sub2 : theme.colors.white}
        />
      </NavButton>
      <NavButton onClick={() => navigate("/map")}>
        <MarkerIcon
          width={24}
          height={24}
          fill={active("/map") ? theme.colors.sub2 : theme.colors.white}
        />
      </NavButton>
      <NavButton onClick={() => navigate("/add")}>
        <AddIcon
          width={24}
          height={24}
          fill={active("/add") ? theme.colors.sub2 : theme.colors.white}
        />
      </NavButton>
      <NavButton onClick={() => navigate("/record")}>
        <ChartIcon
          width={24}
          height={24}
          fill={active("/record") ? theme.colors.sub2 : theme.colors.white}
        />
      </NavButton>
    </NavWrapper>
  );
}
const NavButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${theme.colors.main};
`;
const NavWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${theme.colors.sub};
`;
