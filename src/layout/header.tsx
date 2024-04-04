import styled from "styled-components";

export default function Header() {
  return (
    <HeaderContainer>
      <NavWrapper>헤더 언젠간 완료예정</NavWrapper>
    </HeaderContainer>
  );
}

const NavWrapper = styled.div`
  width: 100%;
`;
const HeaderContainer = styled.div`
  width: 100%;

  padding: 20px 24px;
  & > div {
    flex: 0 0 140px;
  }
`;
