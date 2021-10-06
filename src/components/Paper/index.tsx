import { ReactNode } from "react";
import { XPaper } from "./styles";

interface IPaper {
    children: ReactNode;
}

const Paper = ({ children }: IPaper) => {

    return (
        <XPaper>
            {children}
        </XPaper>
    );
}

export default Paper;