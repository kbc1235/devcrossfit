import styled from "styled-components";
import theme from "../../../styles/theme";

export default function Error() {
  return (
    <ErrorContainer>
      <ErrorIcon>🚫</ErrorIcon>
      <ErrorText>지도 정보를 불러오는 데 실패했습니다.</ErrorText>
    </ErrorContainer>
  );
}
const ErrorIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: 24px;
`;

const ErrorText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  font-size: 16px;
  font-weight: 600;
  color: #f52424;
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10002;
  background: ${theme.colors.main};
`;
