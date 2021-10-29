import { Box } from "@material-ui/core";
import styled from "styled-components";
import theme from "styles/theme";

export const XListContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 240px;
    background: ${theme.colors.white};
    padding: 10px 0;

    p{
        margin-top: 30px;
        color: ${theme.colors.secondary};
        font-weight: ${theme.fonts.weight.bolder};
        text-transform: uppercase;
        width: 100%;
        text-align: center;
    }

    svg, a,li{
        color: ${theme.colors.grayDark}bb;
        font-weight: ${theme.fonts.weight.bolder};
        text-decoration: none;
        transition: all ease-in-out 0.2s;
    }
    a#active{
        li{
            background: ${theme.colors.primaryDark};
        }

        &,svg,li{
            color: ${theme.colors.white};
            span{
                font-weight: 500 !important;
            }
        }
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