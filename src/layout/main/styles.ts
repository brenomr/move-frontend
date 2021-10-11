import styled from "styled-components";
import theme from "styles/theme";

export const XMain = styled.div`
  display: flex;
  height: 100vh;
`;

export const XContent = styled.div`
  height: 100%;
  overflow: auto;
`;

export const XRight = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: ${theme.colors.grayDark}
`;