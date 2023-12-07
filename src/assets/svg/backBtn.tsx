import { SVGPropsInterface } from "../../types/types";
export default function BackBtnIcon({
  width,
  height,
  fill,
}: SVGPropsInterface) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <path
        d="M15 7L10 12L15 17"
        stroke={fill || "#fff"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
