import styled from "styled-components";

export default function Loading() {
  return (
    <LoadingContainer>
      <Loader />
      <LoadingText>Box 불러 오는중</LoadingText>
    </LoadingContainer>
  );
}
const Loader = styled.div`
  width: 48px;
  height: 48px;
  position: relative;
  perspective: 500px;
  &:before,
  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: 24px;
    height: 48px;
    background: #222;
    border-radius: 0 24px 24px 0;
    transform-origin: 0 0;
    animation: flip 2s linear infinite alternate;
  }
  &:after {
    left: 0;
    border-radius: 24px 0 0 24px;
    transform-origin: 100% 0;
    animation-delay: 1s;
  }

  @keyframes flip {
    0%,
    10% {
      transform: rotateY(0deg);
    }
    90%,
    100% {
      transform: rotateY(-180deg);
    }
  }
`;
const LoadingText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  font-size: 16px;
  font-weight: 600;
  color: #222;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
