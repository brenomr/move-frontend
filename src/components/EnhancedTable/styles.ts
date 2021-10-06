import Paper from "components/Paper";
import styled from "styled-components";
import theme from "styles/theme";

export const XTablePaper = styled(Paper)`
.actionText {
    color: #000;
    text-decoration: none;
    &:hover{
      color: ${theme.colors.primary}
    }
  }
`

export const XNoData = styled.div`
    width: 100%;
    text-align: center;
    align-self: center;
    align-items: center;
    margin-bottom: 1rem;
    
    div{
      color: ${theme.colors.primary},
    }
    p {
      margin-top: 0.4rem;
      color: ${theme.colors.gray};
      font-size: 1.3rem;
      @media screen and (max-width: 700px) {
        font-size: 0.7rem;
        margin: 0 1rem;
      }
    }
  
`;