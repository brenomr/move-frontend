/**
 * I am color palette.
 */
export const colors = {
  white: "#ffffff",
  almostWhite: "#F6F6F6",
  grayLight: "#ededed",
  gray: "#c1c1c1",
  grayDark: "#292929",
  black: "#191919",
  error: "#e25656",
  success: "#74c174",
  primary: "#ffc65c",
  primaryLight: "#ffe8bd",
  primaryDark: "#ffaa40",
  secondary: "#f79651",
  secondaryDark: "#e07c35"
}

const gradients = {
  primary: `linear-gradient(to top, ${colors.secondary}, ${colors.secondaryDark})`,
};

/**
 * I am a fonts list.
 */
const fonts = {
  weight: {
    bold: 500,
    bolder: 700,
    medium: 400,
    light: 300,
    extraLight: 200,
  },
  primary: 'Roboto, sans-serif',
  secondary: '"Montserrat", "Red Hat Display"'
};

/**
 * I am an application theme.
 */
const theme = {
  fonts: { ...fonts },
  colors: colors,
  gradients: gradients,
  background: colors.grayDark
};

/**
 * EXPORTS
 */
export default theme;