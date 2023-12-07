import axios from "axios";
import { useEffect, useState } from "react";

import styled from "styled-components";

import theme from "../../../styles/theme";
import CrossfitText from "../../../assets/svg/crossfit";
import { Wod } from "../../../types/types";

import Layout from "../../templates/Mainlayout/layout";
import Select from "../../atoms/Select/Select";

import WodData from ".././../../api/heroes.json";

export default function Hero() {
  const [data, setData] = useState<Wod[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [genderFilter, setGenterFilter] = useState<string>("ALL");

  const record = async () => {
    const res = await axios.get(
      " https://wodwell.com/wp-json/wodwell/v2/pages/filters/?category=hero-wods"
    );

    console.log(res);
  };
  //aaaaa
  useEffect(() => {
    record();
    const filteredData = WodData.filter((data) => {
      if (genderFilter === "ALL") {
        return true;
      } else {
        return data.gender === genderFilter;
      }
    });
    setTotal(filteredData.length);
    setData(filteredData as Wod[]);
  }, [genderFilter]);

  return (
    <Layout title={"HERO WOD"} backBtn>
      <Select value={genderFilter} setValue={setGenterFilter} />
      <TotalList>Total : {total}</TotalList>
      <WodList>
        {data?.map((wod, index) => {
          return (
            <Item key={index} $url={wod.img}>
              <ContBox>
                <WodInfo>
                  {/* <Column>
                    <Label>PHOTO</Label>
                    <ItemImgBox>
                      <Img src={wod.img} alt={wod.name} />
                    </ItemImgBox>
                  </Column> */}
                  <Column>
                    <Label>WODNAME</Label>
                    <Name>{wod.name}</Name>
                  </Column>
                  <Column>
                    <Label>WODNAME</Label>
                    <Name>{wod.name}</Name>
                  </Column>
                  <Column>
                    <Label>WODNAME</Label>
                    <Name>{wod.name}</Name>
                  </Column>
                  <Column>
                    <Label>WODNAME</Label>
                    <Name>{wod.name}</Name>
                  </Column>

                  <Column>
                    <Label>MOVEMENT</Label>
                    {wod.workout.map((item, index) => {
                      return <Wokout key={index}>{item}</Wokout>;
                    })}
                  </Column>
                  <Column>
                    <Label>ROUNDS</Label>
                    <Text>{wod.rounds}</Text>
                  </Column>
                  <Column>
                    <Label>RECORD</Label>
                    <Text>{wod.time}</Text>
                  </Column>
                  <Column>
                    <Label>START DAY</Label>
                    <Wokout>{wod.startDay}</Wokout>
                  </Column>
                </WodInfo>
              </ContBox>
              <Background>
                <CrossfitText
                  width="100%"
                  height="100%"
                  fill={theme.colors.sub2}
                />
              </Background>
            </Item>
          );
        })}
      </WodList>
    </Layout>
  );
}

const ItemImgBox = styled.div`
  ${theme.common.flexCenter};
  width: 100%;
  min-height: 200px;
  height: 100%;
  max-height: 200px;
  border-radius: 20px;
  overflow: hidden;
  @media (max-width: ${theme.deviceSize.tablet}) {
    width: 100%;
    height: 150px;
  }
`;
// const Img = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: contain;
//   border-radius: 20px;
// `;
const ContBox = styled.div`
  position: relative;
  z-index: 1;
`;

const Label = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.sub};
`;
const Name = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
const Wokout = styled.p`
  & + & {
    margin-top: 0.3rem;
  }
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.light};
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.light};
`;

const Column = styled.div`
  ${Label} + ${Name} {
    margin-top: 0.5rem;
  }
  ${Label} + ${Wokout} {
    margin-top: 0.5rem;
  }
  ${Label} + ${Text} {
    margin-top: 0.5rem;
  }
  ${Label} + ${ItemImgBox} {
    margin-top: 0.5rem;
  }
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Background = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: 300px;
  height: 100%;
  max-height: 300px;
  transform: translate(-50%, -50%);
  & > svg {
    transform: rotate(-45deg);
    filter: blur(3px);
  }
`;

const WodInfo = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  @media (max-width: ${theme.deviceSize.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
// const StoryBox = styled.div`
//   width: calc(100% - 100px);
//   ${Text} {
//     font-size: ${({ theme }) => theme.fontSize.sm};
//     word-break: keep-all;
//     line-height: 1.3;
//   }
// `;

const WodList = styled.ul`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  @media (max-width: ${theme.deviceSize.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${theme.deviceSize.mobile}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const TotalList = styled.p`
  padding: 0.5rem;
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
`;

const Item = styled.li<{
  $url: string;
}>`
  position: relative;
  padding: 1.5rem;
  min-height: 350px;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid ${theme.colors.sub};
  @media (max-width: ${theme.deviceSize.tablet}) {
    ${theme.common.flexColumn};
  }
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${({ $url }) => `url(${$url})`};
  background-size: cover;
  background-color: ${theme.colors.opacityMain};
  background-blend-mode: multiply;
  box-shadow: 0 0 10px 0 ${theme.colors.opacityBlue};
`;
