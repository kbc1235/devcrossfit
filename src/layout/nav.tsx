import styled from "styled-components";
import theme from "../styles/theme";

export default function Nav() {
  return <NavWrapper>Nav</NavWrapper>;
}

const NavWrapper = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${theme.colors.sub};
`;
