import styled from "styled-components";

export default function SideBar({
  openSide,
  onClick,
}: {
  openSide: boolean;
  onClick: () => void;
}) {
  return (
    <SideBarContainer $openSide={openSide}>
      <div
        onClick={() => {
          onClick;
        }}
      >
        SideBar
      </div>
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div<{ $openSide: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ $openSide }) => ($openSide ? "0" : "-15vw")};
  width: 20vw;
  height: 100vh;
  padding: 1rem;
  background: #f5f5f5;
  z-index: 1001;
  transition: 0.3s all ease-in-out;
`;
