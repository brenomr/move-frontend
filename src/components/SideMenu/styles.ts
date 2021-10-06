import { Box } from "@material-ui/core";
import styled from "styled-components";
import theme from "styles/theme";

export const XListContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 250px;
    background: ${theme.colors.white};
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    padding: 10px 0;

    a{
        color: ${theme.colors.grayDark};
    }
    ul{
        padding: 0;
        height: 100%;
        width: 100%;
    }
    li{
        width: 100%;
    }
    .listItem{
        padding: 0;
    }
    .menuItem{
        padding: 10px 30px;
    }
    img{
        height: 60px;
        width: 60px;
    }
`;