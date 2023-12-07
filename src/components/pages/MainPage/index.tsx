import styled from "styled-components";

import theme from "../../../styles/theme";
import { useNavigate } from "react-router-dom";
import Layout from "../../templates/Mainlayout/layout";
import { Section, Box, SubTitle } from "../../atoms/BoxModel/BoxModel";
import { Button } from "../../atoms/Button/button";

export default function Main() {
  const navigate = useNavigate();
  return (
    <Layout>
      <MainWrapper>
        <MainCont>
          <MainTitle>
            HERO AND TRIBUTE
            <br />
            WORKOUTS
          </MainTitle>
          <MainButton onClick={() => navigate("/hero")} />
        </MainCont>
        <MainCont>
          <MainTitle>CROSSFIT</MainTitle>
        </MainCont>
      </MainWrapper>
    </Layout>
  );
}

const MainTitle = styled(SubTitle)`
  position: relative;
  font-size: ${theme.fontSize.xl};
  line-height: 1.5;
  z-index: 1;
  @media (max-width: ${theme.deviceSize.tablet}) {
    text-align: center;
  }
`;

const MainCont = styled(Box)`
  ${theme.common.flexCenter};
  position: relative;
  height: 100%;
  &::after {
    content: "";
    display: block;
  }
  &:hover {
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
    ${MainTitle} {
      color: ${({ theme }) => theme.colors.red};
    }
  }
`;
const MainWrapper = styled(Section)`
  ${theme.common.flexCenter};
  width: 100%;
  height: 100%;
  @media (max-width: ${theme.deviceSize.tablet}) {
    flex-direction: column;
  }
  ${MainCont} {
    width: 50%;
    border: 1px solid ${({ theme }) => theme.colors.white};
    @media (max-width: ${theme.deviceSize.tablet}) {
      width: 100%;
    }
  }
`;

const MainButton = styled(Button)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
