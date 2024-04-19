import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components";
import theme from "../styles/theme";
import Loading from "../components/map/component/loading";
import Button, { Btn } from "../components/button";
import dayjs from "dayjs";

interface Place {
  id: string;
  name: string;
  address: string;
  price: number;
  createdAt: string;
}

export default function Home() {
  const navigate = useNavigate();

  const record = async () => {
    const placeCollectionRef = collection(db, "place");
    const res = await getDocs(placeCollectionRef);
    const docs: Place[] = res.docs.map((doc) => ({
      ...(doc.data() as Omit<Place, "id">),
      id: doc.id,
    }));
    docs.sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix());
    return docs;
  };
  const { data: list, isLoading, error } = useQuery("placeList", record);
  if (isLoading) return <Loading text="불러 오는중" />;
  if (error) return <div>Error: </div>;

  const price = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const durationFromNow = (date: string) => {
    const now = dayjs();
    const targetDate = dayjs(date);
    if (now.diff(targetDate, "day") > 0) {
      return `${targetDate.format("YYYY-MM-DD")}`;
    } else if (now.diff(targetDate, "hour") > 0) {
      return `${now.diff(targetDate, "hour")}시간 전`;
    } else {
      return `${now.diff(targetDate, "minute")}분 전`;
    }
  };

  return (
    <HomeWrapper>
      <SectionTitle>
        내 주변 BOX는? <span>위치권한 필요</span>
      </SectionTitle>
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
        <PlaceItem
          style={{ position: "sticky", top: 0, background: theme.colors.main }}
        >
          <PlaceName style={{ fontSize: "14px" }}>
            이름 / 주소 (Total : {list?.length})
          </PlaceName>
          <PlacePrice style={{ fontSize: "14px" }}>드랍인 비용</PlacePrice>
        </PlaceItem>
        {list?.map((item) => (
          <PlaceItem key={item.id}>
            <PlaceItemWrapper>
              <PlaceName>{item.name}</PlaceName>
              <PlaceAddress>{item.address}</PlaceAddress>
              <PlaceAddTime>
                등록시간 : {durationFromNow(item.createdAt)}
              </PlaceAddTime>
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
  height: calc(100vh - 500px);
  overflow-y: auto;
  padding: 0 0.8rem;
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
const PlaceAddTime = styled.p`
  margin-top: 10px;
  font-size: 13px;
  color: ${theme.colors.white};
`;
const PlaceName = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.colors.white};
  span {
    font-size: 13px;
    color: ${theme.colors.white};
  }
  @media (max-width: 500px) {
    font-size: 16px;
  }
`;
const PlaceAddress = styled(PlaceName)`
  font-size: 13px;
  font-weight: 400;

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
const PlacePrice = styled(PlaceName)`
  min-width: 80px;
  margin-left: auto;
  font-size: 18px;
  font-weight: 400;
  text-align: right;
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
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  span {
    margin-left: 8px;
    background: ${theme.colors.white};
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    color: ${theme.colors.sub2};
  }
`;

const HomeWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;
