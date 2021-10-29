import { ReactNode } from "react";
import styled from "styled-components";

interface ITitle {
    children: ReactNode;
}

const XTitle = styled.h2`
    flex: '1 1 100%';
    width: 100%;
    margin-bottom: 20px;
`;

const Title = ({ children }: ITitle) => (<XTitle>{children}</XTitle>);

export default Title;