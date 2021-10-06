import { ReactNode } from "react";
import styled from "styled-components";

interface ITitle {
    children: ReactNode;
}

const XTitle = styled.h2``;

const Title = ({ children }: ITitle) => (<XTitle>{children}</XTitle>);

export default Title;