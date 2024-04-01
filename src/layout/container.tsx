import styled from "styled-components";

export default function Container({ children }: { children: React.ReactNode }) {
  return <LayoutContainer>{children}</LayoutContainer>;
}

const LayoutContainer = styled.div`
  width: 100%;
  height: 100%;
`;
