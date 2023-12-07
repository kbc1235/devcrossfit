import { useNavigate } from "react-router";

import styled from "styled-components";
import Layout from "../../templates/Mainlayout/layout";
import { Section, Box } from "../../../components/atoms/BoxModel/BoxModel";
import { Button } from "../../../components/atoms/Button/button";
import theme from "../../../styles/theme";
export default function BasicPage() {
  const navigate = useNavigate();
  return (
    <Layout title={"알짜정보"} backBtn>
      <SubSection>
        <SubBox>
          <SubBtn onClick={() => navigate("/terminology")}>
            크로스핏 용어
          </SubBtn>
        </SubBox>
        <SubBox>
          <SubBtn onClick={() => navigate("/terminology")}>
            크로스핏 용어
          </SubBtn>
        </SubBox>
        <SubBox>
          <SubBtn onClick={() => navigate("/terminology")}>
            크로스핏 용어
          </SubBtn>
        </SubBox>
        <SubBox>
          <SubBtn onClick={() => navigate("/terminology")}>
            크로스핏 용어
          </SubBtn>
        </SubBox>
        <SubBox>
          <SubBtn onClick={() => navigate("/terminology")}>
            크로스핏 용어
          </SubBtn>
        </SubBox>
      </SubSection>
    </Layout>
  );
}

const SubSection = styled(Section)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  padding: 1rem;
  @media (max-width: ${theme.deviceSize.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${theme.deviceSize.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const SubBox = styled(Box)`
  ${theme.common.flexCenter};
`;

const SubBtn = styled(Button)`
  width: 100%;
  height: 100%;
  padding: 1rem;
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.white};
  border: 1px solid ${theme.colors.white};
  border-radius: 8px;

  &:hover {
    background-color: ${theme.colors.white};
    color: ${theme.colors.main};
  }
`;
