import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { calculateDistance } from "../../../util/latlng";

import theme from "../../../styles/theme";
import { Btn } from "../../../components/button";
import { InputCustom } from "../../../components/input";
import ArrowUp from "../../../assets/svg/arrowUp";

interface Props {
  list: any;
  myLocation: {
    lat: number;
    lng: number;
  };
  onClick: (item: any) => void;
}

export default function MapNav({ list, myLocation, onClick }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [distances, setDistances] = useState<Map<number, string>>(new Map());
  const [sortedList, setSortedList] = useState<any[]>([]); // 정렬된 리스트를 저장할 상태 추가

  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const { data: SortedItems } = useQuery(
    ["SortedItems", debouncedSearch],
    () => {
      return sortedList
        .filter((item: any) => item.name.includes(debouncedSearch))
        .map((item: any) => ({
          ...item,
          distance: distances.get(item.id),
        }));
    },
    {
      initialData: [],
    }
  );

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(debounce);
  }, [search]);

  useEffect(() => {
    // 새로운 Map 객체를 생성하여 캐싱된 거리 정보를 업데이트합니다.
    const newDistances = new Map<number, string>();

    list.forEach((item: any) => {
      const distanceKey = item.id;
      // 이미 계산된 거리가 있다면, 새 Map에 그 값을 복사합니다.
      if (distances.has(distanceKey)) {
        newDistances.set(distanceKey, distances.get(distanceKey)!);
      } else {
        // 거리를 계산합니다.
        const distance = calculateDistance({
          myLat: myLocation.lat,
          myLng: myLocation.lng,
          targetLat: item.selectedInfo.lat,
          targetLng: item.selectedInfo.lng,
        });
        // 거리 단위 변환 로직
        const distanceStr =
          distance < 1
            ? `${Math.floor(distance * 1000)}m`
            : `${distance.toFixed(2)}km`;
        // 새로 계산된 거리를 새 Map에 저장합니다.
        newDistances.set(distanceKey, distanceStr);
      }
    });

    // 상태를 업데이트하여 캐싱된 거리 정보를 새로운 Map으로 설정합니다.
    setDistances(newDistances);

    // 거리에 따라 list 정렬
    const sorted = [...list].sort((a, b) => {
      const distanceA = calculateDistance({
        myLat: myLocation.lat,
        myLng: myLocation.lng,
        targetLat: a.selectedInfo.lat,
        targetLng: a.selectedInfo.lng,
      });
      const distanceB = calculateDistance({
        myLat: myLocation.lat,
        myLng: myLocation.lng,
        targetLat: b.selectedInfo.lat,
        targetLng: b.selectedInfo.lng,
      });
      return distanceA - distanceB;
    });
    setSortedList(sorted); // 정렬된 리스트 상태 업데이트
  }, [list, myLocation]);

  return (
    <MapNavWrapper $isOpen={isOpen}>
      <SearchWrapper>
        <SearchInput
          placeholder="박스이름 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchWrapper>
      <MapNavInner>
        <NavList>
          {debouncedSearch.trim().length > 0 ? (
            (SortedItems || []).length > 0 ? (
              (SortedItems || []).map((item: any) => (
                <ListItem key={item.id} onClick={() => onClick(item)}>
                  <Name>{item.name}</Name>
                  <Distance>{distances.get(item.id)}</Distance>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <NotFound>
                  <span>{`"${debouncedSearch}"`}</span>
                  등록 되지 않은 박스 이름 입니다.
                </NotFound>
              </ListItem>
            )
          ) : (
            sortedList.map((item: any) => (
              <ListItem key={item.id} onClick={() => onClick(item)}>
                <Name>{item.name}</Name>
                <Distance>{distances.get(item.id) || "N/A"}</Distance>
              </ListItem>
            ))
          )}
        </NavList>
        <Button type="button" onClick={handleOpen} $isOpen={isOpen}>
          {isOpen ? (
            <ArrowUp width={26} fill={theme.colors.white} />
          ) : (
            <ArrowUp width={26} fill={theme.colors.white} />
          )}
        </Button>
      </MapNavInner>
    </MapNavWrapper>
  );
}
const NotFound = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${theme.colors.main};
  font-size: 0.9rem;
  font-weight: 400;
  text-align: center;
  cursor: default;
  span {
    color: ${theme.colors.main};
    font-weight: 600;
  }
`;
const SearchInput = styled(InputCustom)`
  width: 100%;

  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 6px;
`;

const SearchWrapper = styled.div`
  padding: 1rem;
`;

const Name = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.sub2};
`;
const Distance = styled(Name)`
  margin-left: auto;
  font-size: 0.8rem;
  font-weight: 400;
  color: #999;
`;
const Button = styled(Btn)<{ $isOpen: boolean }>`
  position: absolute;
  width: 40px;
  height: 50px;
  top: 50%;
  right: 0;
  transform: translate(40px, -50%);
  border-radius: 0 6px 6px 0;
  border: solid ${theme.colors.sub2};
  border-width: 1px 1px 1px 0;
  background: ${theme.colors.sub2};
  color: ${theme.colors.main};
  & > svg {
    transform: ${({ $isOpen }) =>
      $isOpen ? "rotate(-90deg)" : "rotate(90deg)"};
    transition: transform 0.3s ease-in-out;
  }
`;
const ListItem = styled.li`
  & + & {
    border-top: 1px solid #e0e0e0;
  }
  display: flex;
  padding: 1rem;
  cursor: pointer;
`;
const NavList = styled.ul`
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MapNavInner = styled.div`
  position: relative;
  height: calc(100% - 69px);
`;
const MapNavWrapper = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? "0" : "-300px")};
  transition: left 0.3s ease-in-out;
  width: 100%;
  max-width: 300px;
  height: 100dvh;
  background: ${theme.colors.white};
  border-radius: 0 6px 6px 0;
  filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.2));
  z-index: 10001;
`;
