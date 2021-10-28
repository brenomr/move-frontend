import { Box } from "@material-ui/core";
import styled from "styled-components";
import theme from "styles/theme";

export const XListContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 240px;
    background: ${theme.colors.white};
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    padding: 10px 0;

    p{
        margin-top: 30px;
        color: ${theme.colors.secondary};
        font-weight: ${theme.fonts.weight.bolder};
        text-transform: uppercase;
        width: 100%;
        text-align: center;
    }

    svg, a{
        color: ${theme.colors.grayDark}bb;
        font-weight: ${theme.fonts.weight.bolder};
        text-decoration: none;
    }
    ul{
        padding: 0;
        width: 100%;
    }
    li{
        width: 100%;
    }
    .listItem{
        padding: 0;
        &:hover{
            svg, a{
                color: ${theme.colors.primary};
            }
        }
    }
    .menuItem{
        padding: 10px 30px;
    }
    img{
        height: 64px;
        width: 64px;
    }
`;