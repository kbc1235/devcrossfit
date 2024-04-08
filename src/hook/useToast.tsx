import { useState } from "react";

interface UseToastReturn {
  isToastVisible: boolean;
  toastMessage: string;
  showToast: (message: string) => void;
  toastType: "success" | "error" | "warning";
}

export const useToast = (): UseToastReturn => {
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error" | "warning">(
    "success"
  );

  const showToast = (
    message: string,
    type: "success" | "error" | "warning" = "success"
  ) => {
    setToastMessage(message);
    setToastType(type);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 1500);
  };
  return { isToastVisible, toastMessage, showToast, toastType };
};
