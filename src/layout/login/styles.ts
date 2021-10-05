import styled from 'styled-components';
import theme from 'styles/theme';

export const XContainer = styled.div`
    height: 100vh;
    display: flex;
    background: ${theme.background};
`;

export const XContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80%;
    width: 60vh;
    margin: auto;
    border-radius: 20px;
    background: ${theme.colors.white};
`;