import styled from "styled-components";

export default function Header() {
  return <HeaderContainer></HeaderContainer>;
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 24px 0;
  & > div {
    flex: 0 0 140px;
  }
`;
