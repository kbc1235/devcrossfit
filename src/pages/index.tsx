import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components";
import theme from "../styles/theme";
import Button, { Btn } from "../components/button";

export default function Home() {
  const navigate = useNavigate();

  const record = async () => {
    const placeCollectionRef = collection(db, "place");
    const res = await getDocs(placeCollectionRef);
    return res.docs.map((doc) => ({ ...doc.data() }));
  };
  const { data: list, isLoading, error } = useQuery("placeList", record);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: </div>;

  const price = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <HomeWrapper>
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
        <PlaceSearchBox>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV3_Rhla4_nxFErpk6aSOC-HxQ0v09H-paMTJ-0WAvJg&s" />
        </PlaceSearchBox>
        <Button type="button" onClick={() => navigate("/map")}>
          박스찾기
        </Button>
      </MapContainer>
      <PlaceAdd>
        <AddBtn type="button" onClick={() => navigate("/add")}>
          박스 정보 등록하기
        </AddBtn>
      </PlaceAdd>
      <PlaceList>
        <PlaceItem>
          <PlaceName style={{ fontSize: "16px" }}>이름 / 주소</PlaceName>
          <PlacePrice style={{ fontSize: "16px" }}>드랍인 비용</PlacePrice>
        </PlaceItem>
        {list?.map((item) => (
          <PlaceItem key={item.id}>
            <PlaceItemWrapper>
              <PlaceName>{item.name}</PlaceName>
              <PlaceAddress>{item.address}</PlaceAddress>
            </PlaceItemWrapper>
            <PlacePrice>{price(item.price)}원</PlacePrice>
          </PlaceItem>
        ))}
      </PlaceList>
    </HomeWrapper>
  );
}

const PlaceList = styled.ul`
  margin-top: 20px;
  max-height: 33vh;
  overflow-y: auto;
  padding: 1rem;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 8px;
    background: ${theme.colors.sub};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${theme.colors.sub2};
  }
`;
const PlaceItemWrapper = styled.div``;
const PlaceItem = styled.li`
  & + & {
    margin-top: 10px;
  }
  display: flex;
  align-items: center;
`;
const PlaceName = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.colors.white};
`;
const PlaceAddress = styled(PlaceName)`
  font-size: 13px;
  font-weight: 400;
`;
const PlacePrice = styled(PlaceName)`
  margin-left: auto;
  font-size: 18px;
  font-weight: 400;
`;

const AddBtn = styled(Btn)`
  width: 100%;
  padding: 20px;
  font-size: 18px;
  font-weight: 700;
  border-radius: 10px;
  background: ${theme.colors.sub2};
  color: ${theme.colors.white};
  &:hover {
    background: ${theme.colors.sub};
  }
`;
const PlaceAdd = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const PlaceSubTitle = styled.p`
  margin-top: 20px;
  font-size: 18px;
  letter-spacing: 0.05em;
  text-align: center;
`;
const PlaceTitle = styled.h2`
  margin-top: 20px;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.05em;
  text-align: center;
  font-family: "Point";
`;
const PlaceSearchBox = styled.div`
  & + & {
    @media (max-width: 500px) {
      display: none;
    }
  }
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  & > svg {
    filter: contrast(0.1);
  }
  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const MapContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 400px;
  margin-top: 20px;
  border: 1px solid ${theme.colors.sub};
  background: ${theme.colors.sub};
  border-radius: 10px;
  overflow: hidden;
  & > button {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    font-size: 0;
    background: none;
    border: none;
    cursor: pointer;
  }
  & > div {
    flex: 1;
  }
`;
const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
`;

const HomeWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;
