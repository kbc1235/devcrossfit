import { SvgProps } from "../../types/types";

export default function MarkerIcon({ width, height, fill }: SvgProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 48 72">
      <path
        fill={fill}
        d="M24,0 C11.406,0 0,10.209 0,22.806 C0,35.4 10.407,50.436 24,72 C37.593,50.436 48,35.4 48,22.806 C48,10.209 36.597,0 24,0 L24,0 Z M24,33 C19.029,33 15,28.971 15,24 C15,19.029 19.029,15 24,15 C28.971,15 33,19.029 33,24 C33,28.971 28.971,33 24,33 L24,33 Z"
      ></path>
    </svg>
  );
}
