import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

import styled from "styled-components";
import dayjs from "dayjs";

import Input from "../../components/input";
import { Btn } from "../../components/button";

import theme from "../../styles/theme";

export default function PlaceAddPage() {
  const navigate = useNavigate();
  const [price, setPrice] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedInfo, setSelectedInfo] = useState<{
    name: string;
    lat: string;
    lng: string;
  }>({
    name: "",
    lat: "",
    lng: "",
  });

  const handleSubmit = async () => {
    const placeCollectionRef = collection(db, "place");
    const newPlaceRef = doc(placeCollectionRef);
    await addDoc(placeCollectionRef, {
      id: newPlaceRef.id,
      createdAt: dayjs().format("YYYY-MM-DD HH:mm"),
      name: selectedInfo.name,
      price: price,
      lat: selectedInfo.lat,
      lng: selectedInfo.lng,
    });
  };

  const handleAddress = async () => {
    if (!address) return;
    const res = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${address}`,
      {
        headers: {
          Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
        },
      }
    );
    if (res.data.documents.length > 0) {
      setKeywordList(res.data.documents);
    }
  };

  const validate = !selectedInfo.name || !price || !address;

  return (
    <PlaceAddContainer>
      <IputWrapper>
        <Input
          type="text"
          placeholder="박스이름"
          value={selectedInfo.name}
          readOnly
        />
        <Input
          type="text"
          placeholder="드랍인 가격을 입력해주세요"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
        />
        <Input
          type="text"
          placeholder="주소를 입력해주세요"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          value={address}
        />
        <Button
          type="button"
          onClick={() => {
            handleAddress();
            setIsOpen(true);
          }}
          $caseType="primary"
        >
          주소 검색
        </Button>
      </IputWrapper>
      <ButtonWrapper>
        <Button type="button" onClick={() => navigate(-1)} $caseType="cancel">
          취소
        </Button>
        <Button
          type="button"
          $caseType="primary"
          onClick={() => {
            handleSubmit();
            navigate("/");
          }}
          disabled={validate}
        >
          등록
        </Button>
      </ButtonWrapper>
      {isOpen && (
        <AddressModal
          keywordList={keywordList}
          setSelectedInfo={setSelectedInfo}
          setIsOpen={setIsOpen}
        />
      )}
    </PlaceAddContainer>
  );
}

const AddressModal = ({
  keywordList,
  setSelectedInfo,
  setIsOpen,
}: {
  keywordList: any;
  setSelectedInfo: any;
  setIsOpen: any;
}) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <ModalTitle>박스 검색 결과</ModalTitle>
        <ModalList>
          {keywordList?.map((item: any) => (
            <ModalItem key={item.id}>
              <ItemInfo>
                <ItemTitle>{item.place_name}</ItemTitle>
                <ItemAddress>{item.address_name}</ItemAddress>
              </ItemInfo>
              <Button
                type="button"
                $caseType="primary"
                onClick={() => {
                  setSelectedInfo({
                    name: item.place_name,
                    lat: item.y,
                    lng: item.x,
                  });
                  setIsOpen(false);
                }}
              >
                선택
              </Button>
            </ModalItem>
          ))}
        </ModalList>
      </ModalContent>
    </ModalWrapper>
  );
};
const ModalItem = styled.li`
  & + & {
    border-top: 1px solid ${theme.colors.sub2};
  }
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  & > ${Btn} {
    margin-left: auto;
    max-width: 100px;
  }
`;

const ItemInfo = styled.p`
  font-size: 14px;
`;

const ItemTitle = styled(ItemInfo)`
  font-size: 18px;
  font-weight: 400;
  color: ${theme.colors.main};
`;
const ItemAddress = styled(ItemInfo)`
  font-size: 12px;
  color: ${theme.colors.sub2};
`;

const ModalList = styled.ul`
  height: calc(100% - 50px);
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ModalTitle = styled.h3`
  padding: 10px;
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colors.sub2};
`;
const ModalContent = styled.div`
  width: 500px;
  height: 500px;
  background-color: #fff;
  border-radius: 10px;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const IputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled(Btn)<{ $caseType: "cancel" | "primary" }>`
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  color: #fff;
  ${({ $caseType }) =>
    $caseType === "primary"
      ? `background-color: ${theme.colors.sub2};&:hover{background-color:#07676b}`
      : $caseType === "cancel"
      ? `
        background-color: #f54848;
        &:hover{background-color:#cf3a3a}
    `
      : `
    background-color: #fff;
    `};
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const PlaceAddContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;
