import styled from "styled-components";

export default function Home() {
  return (
    <HomeWrapper>
      <Section>
        <SectionTitle>내 주변 BOX는?</SectionTitle>
        <MapContainer></MapContainer>
      </Section>
    </HomeWrapper>
  );
}
const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 20px;
  border: 1px solid #fff;
  background: #fff;
  border-radius: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
`;

const Section = styled.section`
  padding: 20px 24px;
`;

const HomeWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;
