import { useNavigate } from "react-router";

import styled from "styled-components";
import Layout from "../../templates/Mainlayout/layout";
import Maps from "../../atoms/Maps/Maps";
import theme from "../../../styles/theme";
import { Section, Box } from "../../../components/atoms/BoxModel/BoxModel";
import { Button } from "../../../components/atoms/Button/button";

export default function CrossfitMain() {
  const navigate = useNavigate();
  return (
    <Layout title={"크로스핏"} backBtn>
      <Section>
        <SubBox>
          <SubBtn onClick={() => navigate("/crossfitbasic")}>
            크린이를 위한 크로스핏
          </SubBtn>
        </SubBox>
      </Section>
      <Maps />
    </Layout>
  );
}

const SubBox = styled(Box)`
  ${theme.common.flexCenter};
  padding: 1rem;
  font-size: ${theme.fontSize.xl};
  color: ${theme.colors.white};
`;

const SubBtn = styled(Button)``;
