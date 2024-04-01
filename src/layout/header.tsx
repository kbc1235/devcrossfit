import { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/svg/logo";
import Button, { Btn } from "../components/button";
export default function Header() {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [guest, setGuest] = useState("");

  return (
    <HeaderContainer>
      <LogoBox>
        <Logo width={118} height={32} fill={"#ff385c"} />
      </LogoBox>
      <CenterBox>
        <TabBox>
          <Tab>
            <Button
              type="text"
              onClick={() => {
                console.log("asdasd");
              }}
            >
              숙소
            </Button>
          </Tab>
          <Tab>
            <Button
              type="text"
              onClick={() => {
                console.log("asdasd");
              }}
            >
              체험
            </Button>
          </Tab>
          <Tab>
            <Button
              type="text"
              onClick={() => {
                console.log("asdasd");
              }}
            >
              온라인 체험
            </Button>
          </Tab>
        </TabBox>
        <SearchBox>
          <Item
            title="여행지"
            placeholder="여행지 검색"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            asdasdasd
          </Item>
          <Item
            title="날짜"
            placeholder="날짜 추가"
            inputType="number"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Item
            title="여행자"
            placeholder="게스트 추가"
            inputType="number"
            value={guest}
            onChange={(e) => setGuest(e.target.value)}
          />
        </SearchBox>
      </CenterBox>
      <UserBox>asdasdas</UserBox>
    </HeaderContainer>
  );
}

export const Item = ({
  title,
  placeholder,
  onChange,
  inputType,
  value,
  children,
}: {
  title: string;
  placeholder: string;
  value: string;
  inputType?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <SearchItem onClick={() => setModalOpen(!modalOpen)}>
      <ItemTitle>{title}</ItemTitle>
      <SearchInput
        value={value}
        onChange={onChange}
        type={inputType}
        placeholder={placeholder}
      />
      {children && modalOpen && <ItemModal>{children}</ItemModal>}
    </SearchItem>
  );
};

const ItemModal = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  min-width: 380px;
  border: 1px solid #e5e7eb;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  z-index: 10;
  cursor: auto;
`;

const SearchInput = styled.input`
  border: none;
`;

const ItemTitle = styled.h4`
  font-size: 13px;
  margin-bottom: 10px;
`;
const SearchItem = styled.div`
  & + & {
    border-left: 1px solid #e5e7eb;
  }
  position: relative;
  padding: 20px;
  cursor: pointer;
`;

const SearchBox = styled.div`
  display: flex;
  margin-top: 40px;
  border: 1px solid #e5e7eb;
  border-radius: 50px;
  padding: 0 18px;
`;

const Tab = styled.li`
  ${Btn} {
    display: flex;
    width: 100%;
    justify-content: center;
    color: #717171;
  }
`;
const TabBox = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  & > ${Tab} {
    flex: 1;
  }
`;

const UserBox = styled.div``;
const CenterBox = styled.div``;
const LogoBox = styled.div``;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 24px 0;
  & > div {
    flex: 0 0 140px;
  }
`;
