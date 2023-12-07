import styled from "styled-components";

export default function Content({
  $title,
  children,
}: {
  $title: string | React.ReactNode;
  children: React.ReactNode;
}) {
  return <ContentWrapper $title={$title}>{children}</ContentWrapper>;
}

const ContentWrapper = styled.div<{ $title?: string | React.ReactNode }>`
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: ${({ $title }) => ($title ? "74px" : "0")};
`;
