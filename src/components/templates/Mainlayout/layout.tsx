import styled, { ThemeProvider } from "styled-components";
import theme from "../../../styles/theme";

import Header from "./header";
import Content from "./content";
const LayoutWrapper = styled.div`
  min-width: 375px;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.white};
`;

export default function Layout({
  title,
  backBtn,
  closeBtn,
  children,
}: {
  title?: string | React.ReactNode;
  backBtn?: boolean;
  closeBtn?: boolean;
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <LayoutWrapper>
        {title && (
          <Header title={title} backBtn={backBtn} closeBtn={closeBtn} />
        )}
        <Content $title={title}>{children}</Content>
      </LayoutWrapper>
    </ThemeProvider>
  );
}
