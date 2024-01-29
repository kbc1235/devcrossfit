import styled from "styled-components";

import { ImageBox, NameBox, Name } from "./UserCard";

type DataType = {
  firstName?: string;
  lastName?: string;
  img?: string;
  position?: string;
  career?: number;
  cardNumber?: string;
  content?: string;
  contentImg?: string;
};

export default function FeedCardComponent({
  selected,
}: {
  selected: DataType | null;
}) {
  return (
    <FeedCard>
      <FeedCardHeader>
        <ProfileBox>
          <ImageBox>
            <img src={selected?.img} />
          </ImageBox>
          <NameBox>
            <Name $lastName>{selected?.lastName}</Name>
            <Name>{selected?.firstName}</Name>
          </NameBox>
        </ProfileBox>
        <FeedMediaBox>
          <img src={selected?.contentImg} />
        </FeedMediaBox>
      </FeedCardHeader>
      <FeedCardBody>
        <FlexBox>
          <NameBox>
            <Name>{selected?.lastName}</Name>
            <Name>{selected?.firstName}</Name>
          </NameBox>
          <FeedBtnBox>
            <button>
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="red"
                  d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"
                />
              </svg>
            </button>
            <button>댓글</button>
            <button>공유</button>
          </FeedBtnBox>
        </FlexBox>
      </FeedCardBody>
    </FeedCard>
  );
}
const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;
const FeedMediaBox = styled.div`
  max-height: 20rem;
  text-align: center;
  overflow: hidden;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background: #fff;

  ${ImageBox} {
    width: 3rem;
    height: 3rem;
    border: 3px solid transparent;
    border-radius: 50%;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(to right, red 0%, orange 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    & + ${NameBox} {
      margin-left: 1rem;
    }
  }
`;
const FeedBtnBox = styled.div`
  display: flex;
  margin-left: auto;
`;

const FeedCardHeader = styled.div``;
const FeedCardBody = styled.div`
  padding: 1rem 0.5rem;
  background: #fff;
  ${NameBox} {
    display: flex;
    ${Name} {
      margin: 0;
      font-size: 1rem;
      font-weight: bold;
    }
  }
`;
const FeedCard = styled.div`
  border: 1px solid #fff;
  border-radius: 10px;
  overflow: hidden;
`;
