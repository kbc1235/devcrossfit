const pixelToRem = (size: number) => `${size / 16}rem`;

const fontSize = {
  xl: pixelToRem(28),
  lg: pixelToRem(20),
  md: pixelToRem(16),
  sm: pixelToRem(14),
};

const fontWeight = {
  bold: 700,
  normal: 400,
  light: 300,
};

const colors = {
  main: "#1f242b",
  opacityMain: "#1f242bc9",
  sub: "#6b87a0",
  sub2: "#494f55",
  red: "#f91941",
  blue: "#0046ff",
  white: "#fafcfc",
  opacityRed: "rgba(249, 25, 65, 0.3)",
  opacityBlue: "rgba(0, 70, 255, 0.3)",
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
