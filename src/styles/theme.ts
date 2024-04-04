const pixelToRem = (size: number) => `${size / 16}rem`;

const fontSize = {
  xl: pixelToRem(28),
  lg: pixelToRem(20),
  md: pixelToRem(16),
  sm: pixelToRem(14),
  xs: pixelToRem(12),
};

const fontWeight = {
  bold: 700,
  normal: 400,
  light: 300,
};

const colors = {
  main: "#222831",
  sub: "#393E46",
  sub2: "#00ADB5",
  white: "#EEEEEE",
};

const common = {
  flexCenter: `
        display: flex;
        justify-content: center;
        align-items: center;
    `,
  flexColumn: `
        display: flex;
        flex-direction: column;
        `,
  flex: `
        display: flex;
    `,
};

const borderRadius = {
  xl: "10px",
  lg: "8px",
  md: "5px",
  sm: "3px",
};

const deviceSize = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
};

const theme = {
  fontSize,
  fontWeight,
  colors,
  common,
  borderRadius,
  deviceSize,
};

export default theme;
