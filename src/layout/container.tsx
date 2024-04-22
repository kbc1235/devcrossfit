import styled from "styled-components";
import theme from "../styles/theme";

export default function Container({ children }: { children: React.ReactNode }) {
  return <LayoutContainer>{children}</LayoutContainer>;
}

const LayoutContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 60px);
  background: ${theme.colors.main};
  padding: 1rem;
  overflow-y: auto;
`;
