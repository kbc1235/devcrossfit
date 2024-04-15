import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  doc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db } from "../../firebase";
import { useToastContext } from "../../components/toastContext";

import styled from "styled-components";
import dayjs from "dayjs";

import Input, { InputCustom } from "../../components/input";
import { Btn } from "../../components/button";

import theme from "../../styles/theme";
import useOutsideClick from "../../hook/useOutsideClick";
import { Place } from "../../types/types";
import { useAuth } from "../../hook/useAuth"; // Adjust the path as necessary

export default function PlaceAddPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();
  const auth = useAuth();

  const [images, setImages] = useState<File[]>([]);
  const [price, setPrice] = useState<Place["price"]>("");
  const [address, setAddress] = useState<Place["address"]>("");
  const [keywordList, setKeywordList] = useState<Place["keywordList"]>([]);
  const [isOpen, setIsOpen] = useState<Place["isOpen"]>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedInfo, setSelectedInfo] = useState<Place["selectedInfo"]>({
    name: "",
    address: "",
    lat: "",
    lng: "",
    img: [],
  });
  const addPlaceMutation = useMutation(
    async (newPlace: any) => {
      const placeCollectionRef = collection(db, "place");
      // name 필드를 기준으로 중복 데이터 검색
      const q = query(placeCollectionRef, where("name", "==", newPlace.name));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // 중복 데이터가 없으면 새 문서 추가
        const newId = doc(placeCollectionRef).id; // 고유 아이디 생성
        return addDoc(placeCollectionRef, {
          id: newId,
          userId: auth?.uid,
          ...newPlace,
        });
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages([...images, ...fileArray]);
    }
  };

  const uploadImagesToStorage = async (files: File[]) => {
    if (!files.length || files.length > 2) return [];
    const storage = getStorage();
    const uploadPromises = files.map((file) => {
      const storageRef = ref(storage, `boximg/${file.name}`);
      return uploadBytes(storageRef, file).then((snapshot) =>
        getDownloadURL(snapshot.ref)
      );
    });
    try {
      const downloadURLs = await Promise.all(uploadPromises);
      console.log("Uploaded blobs or files!", downloadURLs);
      return downloadURLs; // 업로드된 이미지들의 URL 배열을 반환합니다.
    } catch (error) {
      console.error("Upload failed", error);
      // 에러 처리 로직
      return [];
    }
  };

  const handleSubmit = async () => {
    if (images.length > 2)
      return showToast("이미지는 최대 2개까지 업로드 가능합니다.", "warning");

    addPlaceMutation.mutate({
      createdAt: dayjs().format("YYYY-MM-DD HH:mm"),
      name: selectedInfo.name,
      price: price,
      address: selectedInfo.address,
      selectedInfo: {
        ...selectedInfo,
        img: await uploadImagesToStorage(images),
      },
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

  console.log(images);

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
          type="number"
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
        <ImageWrapper>
          <ImgBtn
            type="button"
            onClick={() => inputRef.current?.click()}
            style={{
              width: images.length > 0 ? "100px" : "100%",
            }}
          >
            사진 선택
          </ImgBtn>
          <ImgInput
            type="file"
            placeholder="박스 이미지"
            multiple
            ref={inputRef}
            onChange={handleImageChange}
          />
          {images.length > 0 && (
            <ImgBox>
              {images?.map((image, index) => (
                <Image key={index}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`image-${index}`}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <button
                    onClick={() => {
                      const newImages = images.filter(
                        (_, imgIndex) => imgIndex !== index
                      );
                      setImages(newImages);
                    }}
                  >
                    ❌
                  </button>
                </Image>
              ))}
            </ImgBox>
          )}
        </ImageWrapper>

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
        <ModalTitle>
          박스 검색 결과
          <Button
            type="button"
            $caseType="cancel"
            onClick={() => setIsOpen(false)}
            style={{ maxWidth: 50, marginLeft: "auto" }}
          >
            👋
          </Button>
        </ModalTitle>
        <ModalList>
          {keywordList.length > 0 && keywordList ? (
            keywordList?.map((item: any) => (
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
                      address: item.road_address_name,
                      lat: item.y,
                      lng: item.x,
                    });
                    setIsOpen(false);
                  }}
                >
                  선택
                </Button>
              </ModalItem>
            ))
          ) : (
            <NotFound>검색결과가 없습니다.</NotFound>
          )}
        </ModalList>
      </ModalContent>
    </ModalWrapper>
  );
};
const Image = styled.div`
  position: relative;
  min-width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
  & > button {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 50%;
  }
`;
const ImgBox = styled.div`
  display: flex;
  width: calc(100% - 110px);
  gap: 10px;
  overflow-x: auto;
`;

const ImgBtn = styled(Btn)`
  width: 100px;
  height: 100px;
  background-color: #fff;
  border: 1px solid ${theme.colors.sub2};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImgInput = styled(InputCustom)`
  display: none;
`;
const ImageWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const NotFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 73px);
  font-size: 16px;
  font-family: "point";
  color: ${theme.colors.main};
`;

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
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ModalTitle = styled.h3`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid ${theme.colors.white};
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colors.main};
`;
const ModalContent = styled.div`
  width: 100%;
  max-width: 500px;
  height: 500px;
  background-color: #fff;
  border-radius: 10px;
  overflow-y: auto;
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
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
`;

const IputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled(Btn)<{ $caseType: "cancel" | "primary" }>`
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  color: #fff;
  ${({ $caseType }) =>
    $caseType === "primary"
      ? `background-color: ${theme.colors.sub2};&:hover{background-color:${theme.colors.sub}`
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
