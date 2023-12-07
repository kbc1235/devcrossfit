import styled from "styled-components";
import { ButtonProps } from "../../../types/types";

export const Button = styled.button.attrs<ButtonProps>(({ $type }) => ({
  type: $type || "button",
}))``;
