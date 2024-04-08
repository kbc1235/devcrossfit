import React, { createContext, useContext } from "react";
import { useToast } from "../hook/useToast";
import styled, { css } from "styled-components";

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error" | "warning") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      "useToastContext는 ToastProvider 내에서 사용되어야 합니다."
    );
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isToastVisible, toastMessage, showToast, toastType } = useToast();

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {isToastVisible && (
        <ToastMessage type={toastType}>{toastMessage}</ToastMessage>
      )}
    </ToastContext.Provider>
  );
};

const ToastMessage = styled.div<{ type?: "success" | "error" | "warning" }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  color: #fff;
  border-radius: 5px;
  ${({ type }) =>
    type === "error"
      ? css`
          background-color: #d32f2f; // Error color
        `
      : type === "warning"
      ? css`
          background-color: #ff9800; // Warning color
        `
      : css`
          background-color: #388e3c; // Success color
        `}
`;
