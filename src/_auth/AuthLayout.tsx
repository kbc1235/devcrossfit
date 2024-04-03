import styled from "styled-components";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthLayout() {
  const isAuthenticated = false;
  return (
    <>
      {!isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <AuthLayoutContainer>
            <Outlet />
          </AuthLayoutContainer>
          <AuthLayoutBackground>CROSSFIT</AuthLayoutBackground>
        </>
      )}
    </>
  );
}

const AuthLayoutContainer = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #171717;
`;
const AuthLayoutBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: #101010;
  color: #fff;
  font-weight: 700;
  font-size: 100px;
  text-shadow: 0 0 10px #fff;
`;
