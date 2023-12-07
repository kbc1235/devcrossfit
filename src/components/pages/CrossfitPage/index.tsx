import styled from "styled-components";
import Layout from "../../templates/Mainlayout/layout";
import Maps from "../../atoms/Maps/Maps";
import theme from "../../../styles/theme";
import { Section, Box } from "../../../components/atoms/BoxModel/BoxModel";

export default function CrossfitMain() {
  return (
    <Layout title={"크로스핏"} backBtn>
      <Maps />
      <Section>
        <SubBox>추후에 추가 예정</SubBox>
      </Section>
    </Layout>
  );
}

const SubBox = styled(Box)`
  ${theme.common.flexCenter};
  padding: 1rem;
  font-size: ${theme.fontSize.xl};
  color: ${theme.colors.white};
`;
