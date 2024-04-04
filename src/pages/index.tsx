import { useState, useEffect } from "react";

import styled from "styled-components";
import { getPlace } from "../_crud/place";

import theme from "../styles/theme";

export default function Home() {
  const [list, setList] = useState<any[]>([]);

  const record = async () => {
    const res = await getPlace();
    if (res.status === 200) {
      setList(res.data);
    }
  };

  useEffect(() => {
    record();
  }, []);

  console.log(list);
  return (
    <HomeWrapper>
      <Section>
        <SectionTitle>내 주변 BOX는?</SectionTitle>
        <MapContainer>
          <PlaceSearchBox>
            <PlaceTitle>
              내 주변의
              <br />
              박스 찾기
            </PlaceTitle>
            <PlaceSubTitle>
              지금 가장 가까운
              <br />
              박스는 어디가 있을까?
            </PlaceSubTitle>
          </PlaceSearchBox>
          <PlaceSearchBox>asdas</PlaceSearchBox>
        </MapContainer>
      </Section>
    </HomeWrapper>
  );
}
const PlaceSubTitle = styled.p`
  font-size: 18px;
  letter-spacing: 0.05em;
  text-align: center;
`;
const PlaceTitle = styled.h2`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.05em;
  text-align: center;
  font-family: "Point";
`;

const PlaceSearchBox = styled.div`
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const MapContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 400px;
  margin-top: 20px;
  border: 1px solid ${theme.colors.sub};
  background: ${theme.colors.sub};
  border-radius: 10px;
  overflow: hidden;
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
