import styled from "styled-components";
import theme from "styles/theme";

export const XContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const XExerciseContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    > * {
        flex: 1;
    }

    > * + * {
        margin-left: 1rem;
    }
`

export const XExercise = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 2rem;
`
export const XImage = styled.div`
    height: 300px;
    width: 300px;
    overflow: hidden;
    border-radius: 20px;
    border: 3px solid ${theme.colors.primary};

    img{
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
`

export const XInfo = styled.div`
    margin-left: 2rem;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    
    font-size: 18px;

    div, small{
        width: 100%;
    }
`