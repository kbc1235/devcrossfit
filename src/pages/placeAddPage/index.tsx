import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../../firebase";
import { useToastContext } from "../../components/toastContext";

import styled from "styled-components";
import dayjs from "dayjs";

import Input from "../../components/input";
import { Btn } from "../../components/button";

import theme from "../../styles/theme";
import useOutsideClick from "../../hook/useOutsideClick";
import { Place } from "../../types/types";

export default function PlaceAddPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  const [price, setPrice] = useState<Place["price"]>("");
  const [address, setAddress] = useState<Place["address"]>("");
  const [keywordList, setKeywordList] = useState<Place["keywordList"]>([]);
  const [isOpen, setIsOpen] = useState<Place["isOpen"]>(false);

  const [selectedInfo, setSelectedInfo] = useState<Place["selectedInfo"]>({
    name: "",
    lat: "",
    lng: "",
  });

  const addPlaceMutation = useMutation(
    async (newPlace: any) => {
      const placeCollectionRef = collection(db, "place");
      // name 필드를 기준으로 중복 데이터 검색
      const q = query(placeCollectionRef, where("name", "==", newPlace.name));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // 중복 데이터가 없으면 새 문서 추가
        return addDoc(placeCollectionRef, newPlace);
      } else {
        // 중복 데이터가 있으면 에러 또는 특정 처리
        throw new Error("Duplicate data found");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("places");
        navigate("/");
        showToast("등록이 완료되었습니다.", "success");
      },
      onError: (error) => {
        if (
          error instanceof Error &&
          error.message === "Duplicate data found"
        ) {
          showToast("이미 등록 되어있는 박스 정보 입니다.", "warning");
        }
      },
    }
  );

  const handleSubmit = async () => {
    addPlaceMutation.mutate({
      createdAt: dayjs().format("YYYY-MM-DD HH:mm"),
      name: selectedInfo.name,
      price: price,
      address: address,
      selectedInfo: selectedInfo,
    });
  };

  // 주소 데이터를 가져오기 위해 useQuery 사용
  const { data: keywordData, refetch: refetchAddress } = useQuery(
    ["addressSearch", address],
    async () => {
      const res = await axios.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${address}`,
        {
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
          },
        }
      );
      return res.data.documents;
    },
    {
      enabled: false, // 이 쿼리는 자동으로 실행되지 않습니다.
    }
  );
  const handleAddress = () => {
    refetchAddress();
  };

  // keywordData를 기반으로 keywordList를 업데이트하기 위해 useEffect 사용
  useEffect(() => {
    if (keywordData) {
      setKeywordList(keywordData);
    }
  }, [keywordData]);

  const validate = !selectedInfo.name || !price || !address;

  return (
    <PlaceAddContainer>
      <IputWrapper>
        <Input
          type="text"
          placeholder="박스 이름을 검색해주세요."
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          value={address}
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
          placeholder="박스이름"
          value={selectedInfo.name}
          readOnly
        />
        <Button
          type="button"
          onClick={() => {
            handleAddress();
            setIsOpen(true);
          }}
          disabled={!address}
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
  setIsOpen: (value: boolean) => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, () => setIsOpen(false));
  return (
    <ModalWrapper>
      <ModalContent ref={modalRef}>
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
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  & > ${Btn} {
    margin-left: auto;
    max-width: 100px;
  }
`;

const ItemInfo = styled.div`
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
