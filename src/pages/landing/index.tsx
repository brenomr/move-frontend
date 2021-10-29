import Button from "components/Button"
import { XContainer } from "./styles"
import { NavLink } from "react-router-dom";

export const LandingPage = () => {

    return (
        <XContainer>
            <h1>BEM-VINDO A MOVE:</h1>
            <h2>Com a Move você ganha uma dinâmica de treino muito mais organizada e eficiente</h2>
            <NavLink to="/login">
                <Button variant="outlined" color="primary">
                    Eu quero fazer parte!
                </Button>
            </NavLink>
        </XContainer>
    )
}