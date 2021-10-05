import { ReactNode } from "react";

export interface IButton {
    children: ReactNode
    icon?: JSX.Element
    loading?: boolean
    type: 'submit' | 'button'
    variant?: 'outlined' | 'contained' | 'text'
    color?: 'primary' | 'secondary' | 'inherit' | 'default'
}

export const defaultProps: IButton = {
    type: 'submit',
    variant: 'contained',
    color: 'primary'
};