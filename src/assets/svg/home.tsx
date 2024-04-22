import { SvgProps } from "types/types";
export default function HomeIcon({ width, height, fill }: SvgProps) {
  return (
    <svg width={width} height={height} fill={fill} viewBox="0 0 24 24">
      <path d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" />
    </svg>
  );
}
