import styled from 'styled-components';
import theme from 'styles/theme';

export const XForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90%;
    width: 80%;

    img{
        height: 30%;
        margin-bottom: 40px;
    }

    p{
        font-size: 12px;
        opacity: 0.7;
        margin-bottom: 10px;
    }
    .MuiBottomNavigationAction-root-2.Mui-selected{
        color: ${theme.colors.secondary}
    }
`;

export const XLink = styled.a`
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
`;