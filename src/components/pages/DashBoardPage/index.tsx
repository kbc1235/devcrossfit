import { faker } from "@faker-js/faker/locale/ko";
import { useState, useEffect } from "react";
import styled from "styled-components";

import SideBar from "./component/SideBar";
import FeedCardComponent from "./component/FeedCard";
import UserCardComponent from "./component/UserCard";

interface DataType {
  firstName?: string;
  lastName?: string;
  img?: string;
  position?: string;
  career?: number;
  cardNumber?: string;
  content?: string;
  contentImg?: string;
}

export default function DashBoardPage() {
  const [openSide, setOpenSide] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [selected, setSelected] = useState<DataType | null>(null);
  useEffect(() => {
    setData(
      Array.from({ length: Math.random() * 500 + 5 }, () => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        img: faker.image.avatarGitHub(),
        position: faker.helpers.arrayElement([
          "프론트 개발자",
          "백엔드 개발자",
          "UI/UX디자이너",
          "기획자",
        ]),
        career: faker.helpers.arrayElement(
          Array.from({ length: 15 }, (_, i) => i)
        ),
        cardNumber: faker.helpers.replaceSymbolWithNumber(
          "####-####-####-####"
        ),
        content: faker.lorem.paragraph(),
        contentImg: faker.image.image(),
      }))
    );
  }, []);
  const handleOpenSide = () => {
    setOpenSide(!openSide);
  };

  return (
    <Container $sideOpen={openSide}>
      <SideBar openSide={openSide} onClick={handleOpenSide} />
      <DashBoardContainer $selected={selected}>
        {data.map((data, index) => {
          return (
            <UserCardComponent
              data={data}
              key={index}
              selected={selected}
              setSelected={setSelected}
            />
          );
        })}
      </DashBoardContainer>
      {selected && (
        <FeedContainer>
          <FeedCardComponent selected={selected} />
        </FeedContainer>
      )}
    </Container>
  );
}

const Container = styled.div<{ $sideOpen: boolean }>`
  display: flex;
  width: 100vw;
  height: 100vh;
  transition: 0.3s all ease-in-out;
  padding-left: ${({ $sideOpen }) => ($sideOpen ? "20vw" : "5vw")};
`;

const FeedContainer = styled.div`
  width: 30rem;
  height: 100%;
  padding: 1rem;
  background: #001730;
  overflow-y: scroll;
`;

const DashBoardContainer = styled.div<{ $selected: DataType | null }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  width: ${({ $selected }) => ($selected ? "calc(100% - 30rem);" : "100%")};
  height: 100%;
  padding: 1rem;
  background: #001730;
  overflow-y: scroll;
`;
