import { SvgProps } from "../../types/types";

export default function ChartIcon({ width, height, fill }: SvgProps) {
  return (
    <svg width={width} height={height} fill="none" viewBox="0 0 24 24">
      <path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667"
      />
    </svg>
  );
}
