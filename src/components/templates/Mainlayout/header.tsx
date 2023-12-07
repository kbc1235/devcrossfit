import { useNavigate } from "react-router-dom";
import BackBtnIcon from "../../../assets/svg/backBtn";

import styled from "styled-components";
import theme from "../../../styles/theme";

const isLogin = false;

const login = () => {
  return (
    <>
      <UserImgBox>
        <UserImg src={sampleUrl.src} alt={sampleUrl.alt} />
      </UserImgBox>
      <UserInfo>
        <UserComment>Crossfit WOD!</UserComment>
        <UserName>김김김김</UserName>
        <UserDate>2021.10.10</UserDate>
      </UserInfo>
    </>
  );
};

export default function Header({
  title,
  closeBtn,
  backBtn,
}: {
  title: string | React.ReactNode;
  backBtn?: boolean;
  closeBtn?: boolean;
}) {
  const navigate = useNavigate();
  return (
    <HeaderBox>
      <HeaderWrapper>
        {backBtn && (
          <BackBtn onClick={() => navigate("/")}>
            <BackBtnIcon width={30} height={35} />
          </BackBtn>
        )}
        {closeBtn && <CloseBtn>s</CloseBtn>}
        {isLogin ? login() : <NotLogin>{title}</NotLogin>}
      </HeaderWrapper>
    </HeaderBox>
  );
}

const HeaderBox = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  max-height: 74px;
  background-color: ${theme.colors.main};
`;

const HeaderWrapper = styled.div`
  ${theme.common.flex};
  align-items: center;
  height: 100%;
  padding: 1rem;
  position: relative;
`;

const UserImgBox = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.sub};
  overflow: hidden;
`;
const UserImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserComment = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.light};
`;
const UserName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
const UserDate = styled.div`
  margin-top: 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.light};
`;

const UserInfo = styled.div`
  margin-left: 1rem;
  ${theme.common.flexColumn};
  ${UserComment} + ${UserName} {
    margin-top: 0.5rem;
  }
`;

const NotLogin = styled.div`
  width: 100%;
  padding: 0 2.5rem;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 1.5;
`;

const sampleUrl = {
  src: "https://avatars.githubusercontent.com/u/76855221?v=4",
  alt: "user profile image",
};

const BackBtn = styled.button`
  ${theme.common.flexCenter};
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);

  width: 30px;
  height: 30px;
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
`;

const CloseBtn = styled.button`
  ${theme.common.flexCenter};
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
`;
