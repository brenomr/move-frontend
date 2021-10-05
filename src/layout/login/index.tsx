import { XContainer, XContent } from "./styles";
import ILoginLayout from "./index.d";

const LoginLayout = ({ children }: ILoginLayout) => {
    return (
        <XContainer>
            <XContent>
                {children}
            </XContent>
        </XContainer>
    )
}

export default LoginLayout;