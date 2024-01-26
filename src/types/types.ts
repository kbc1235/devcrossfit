export type Wod = {
  gender: string;
  name: string;
  img: string;
  rounds: string;
  time: string;
  workout: [];
  story: string;
  startDay: string;
};

export type Terms = {
  type: string;
  name: string;
  meaning: string;
};

export type SVGPropsInterface = {
  width?: string | number;
  height?: string | number;
  fill?: string;
};

export type ChildrenProps = {
  children?: React.ReactNode;
};

export type ButtonProps = {
  $type?: "button" | "submit" | "reset";
};

export type PalworldData = {};
