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

export type PalworldData = {
  item: {
    key?: string;
    name?: string;
    image?: string;
    imageWiki?: string;
    types: [];
    description?: string;
    aura: {
      name?: string;
      description?: string;
    };
    discription?: string;
    suitability?: {
      map(
        arg0: (
          suitability: { type: string; level: string },
          index: number
        ) => import("react/jsx-runtime").JSX.Element
      ): import("react").ReactNode;
      type?: string;
      level?: string;
    };
    drops?: string[];
  };
  index?: number;
};
