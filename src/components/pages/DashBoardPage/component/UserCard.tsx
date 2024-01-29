import styled from "styled-components";
import { Button } from "../../../atoms/Button/button";
type DataType = {
  firstName?: string;
  lastName?: string;
  img?: string;
  position?: string;
  career?: number | undefined;
  cardNumber?: string;
};
export default function UserCardComponent({
  data,
  setSelected,
}: {
  data: DataType;
  selected: DataType | null;
  setSelected: React.Dispatch<React.SetStateAction<DataType | null>>;
}) {
  const userSelect = () => {
    setSelected(data);
  };

  return (
    <CardContainer>
      <Button onClick={() => userSelect()} />
      <ImageBox>
        <img src={data.img} />
      </ImageBox>
      <InfoBox>
        {data.career === 0 && <NewBadge>N</NewBadge>}
        <NameBox>
          <Name $lastName>{data.lastName}</Name>
          <Name>{data.firstName}</Name>
        </NameBox>
        <PositionBox>
          <Position>{data.position}</Position>
          <Career>
            {data?.career && data?.career > 0 ? `${data.career} 년차` : "신입"}
          </Career>
        </PositionBox>
        {/* <>{data.cardNumber}</> */}
      </InfoBox>
    </CardContainer>
  );
}

export const ImageBox = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  overflow: hidden;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NewBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background: tomato;
  color: #fff;
  font-size: 0.7rem;
`;
const Career = styled.p``;
const Position = styled.p``;
const PositionBox = styled.div`
  ${Position} + ${Career} {
    margin-top: 0.2rem;
  }
  margin-top: 0.5rem;

  align-items: center;
`;
export const Name = styled.p<{ $lastName?: boolean }>`
  & + & {
    margin-left: 0.5rem;
  }
  font-size: ${({ $lastName }) => ($lastName ? "1.2rem" : "1rem")};
  font-weight: ${({ $lastName }) => ($lastName ? "600" : "300")};
  color: #000;
`;
export const NameBox = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: center;
`;
const InfoBox = styled.div`
  position: relative;
  width: calc(100% - 6rem);
  margin-left: 1rem;
`;
const CardContainer = styled.div`
  position: relative;
  display: flex;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  background: #fff;
  ${Button} {
    position: absolute;
    top: 0;
    left: 0%;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
`;
