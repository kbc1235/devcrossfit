import { SvgProps } from "../../types/types";

export default function LocalIcon({ width, height, fill }: SvgProps) {
  return (
    <svg width={width} height={height} fill={fill} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M12 2a1 1 0 0 1 .932.638l7 18a1 1 0 0 1-1.326 1.281L13 19.517V13a1 1 0 1 0-2 0v6.517l-5.606 2.402a1 1 0 0 1-1.326-1.281l7-18A1 1 0 0 1 12 2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
