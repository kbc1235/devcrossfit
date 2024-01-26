import { useState, useEffect } from "react";
import styled from "styled-components";

import theme from "../../../styles/theme";

import { PalworldData } from "../../../types/types";
import palworldData from "../../../api/pals.json";

export default function PalWorldPage() {
  const [data, setDate] = useState<PalworldData[]>([]);
  useEffect(() => {
    setDate(palworldData);
  }, []);
  console.log(data);
  return (
    <Grid>
      {data.map((item, index) => {
        return (
          <Item key={item.key}>
            <ImagBox>
              <Img src={item.imageWiki} />
            </ImagBox>
            <NameBox>{item.aura.name}</NameBox>
            <DropBox>
              {item.drops.map((drop, index) => {
                return <DropItem key={index}>{drop}</DropItem>;
              })}
            </DropBox>

            <SuitabilityBox>
              {item.suitability.map((suitability, index) => {
                return (
                  <SuitabilityBadge
                    key={index}
                    type={suitability.type}
                    level={suitability.level}
                  />
                );
              })}
            </SuitabilityBox>
            <div>{item.ability}</div>
            <div>{item.personality}</div>
            <TypeBox>
              {item.types.map((type, index) => {
                return <TypeBadge key={index} type={type} />;
              })}
            </TypeBox>
          </Item>
        );
      })}
    </Grid>
  );
}

const TypeBadge = ({ type }) => {
  const badgeColor = {
    fire: "#FFA756",
    water: "#58ABF6",
    grass: "#8BBE8A",
    electric: "#F2CB55",
    ice: "#0068c3",
    fighting: "#EB4971",
    poison: "#9F6E97",
    ground: "#F78551",
    flying: "#00ffc3",
    psychic: "#F15766",
    bug: "#8BD674",
    rock: "#F2CB55",
    ghost: "#9F6E97",
    normal: "#B5B9C4",
    dark: "#6F6E78",
    neutral: "#B5B9C4",
    dragon: "#de58f6",
  };

  return <Badge style={{ background: badgeColor[type] }} />;
};

const SuitabilityBadge = ({ type, level }) => {
  const badgeColor = {
    handiwork: "#FFA756",
    collection: "#58ABF6",
    battle: "#8BBE8A",
    breeding: "#F2CB55",
    mining: "#EB4971",
    fishing: "#9F6E97",
    cooking: "#F78551",
    farming: "#00ffc3",
    construction: "#F15766",
    crafting: "#8BD674",
    gathering: "#F2CB55",
    trading: "#9F6E97",
    neutral: "#B5B9C4",
    transporting: "#6F6E78",
    planting: "#B5B9C4",
    watering: "#de58f6",
    cooling: "#0068c3",
    lumbering: "#F78551",
    kindling: "#00ffc3",
  };
  return (
    <SuitabilityItem style={{ background: badgeColor[type] }}>
      {type} {level}
    </SuitabilityItem>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(248px, 1fr));
  gap: 1rem;
  padding: 1rem;
  background: #d9e6f4;
`;
const Item = styled.div`
  position: relative;
  padding: 1rem 0.8rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(70, 116, 255, 0.3);
  background: #caddf2;
`;

const ImagBox = styled.div``;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NameBox = styled.div`
  margin-top: 1rem;
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.main};
`;

const DropBox = styled.ul`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;
const DropItem = styled.li`
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  background: ${theme.colors.main};
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.sm};
`;

const SuitabilityBox = styled.ul`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;
const SuitabilityItem = styled.li`
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  background: ${theme.colors.main};
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.sm};
`;
const TypeBox = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.2rem;
  align-items: center;
`;

const Badge = styled.p`
  width: 14px;
  height: 14px;
  border-radius: 50%;
`;
