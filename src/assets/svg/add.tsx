import { SvgProps } from "../../types/types";

export default function AddIcon({ width, height, fill }: SvgProps) {
  return (
    <svg width={width} height={height} fill={fill} viewBox="0 0 24 24">
      <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" />
    </svg>
  );
}
