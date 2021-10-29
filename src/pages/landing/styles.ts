import styled from "styled-components";
import theme from "styles/theme";

export const XContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;

    h1,h2{
        color: ${theme.colors.white}ee;
        text-shadow: 0px 5px 4px black;
        margin: 0;
    }
    h1{
        font-size: 80px;    
    }

    button{
        margin-top: 30px;
        font-size: 20px;
        border: 3px solid ${theme.colors.primary};
        transition: all ease-in-out 0.2s;

        &:hover{
            border: 3px solid ${theme.colors.secondary};
            color: ${theme.colors.secondary};
        }
    }
    a{
        text-decoration: none;

    }
`