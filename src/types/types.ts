export type SvgProps = {
  width: number;
  height?: number;
  fill?: string;
};

export type Place = {
  id: string;
  createdAt: string;
  name: string;
  price: string;
  address: string;
  keywordList: string[];
  isOpen: boolean;
  imgUpload: string;
  imgList: string[];
  selectedInfo: {
    name: string;
    address: string;
    lat: string;
    lng: string;
  };
};
