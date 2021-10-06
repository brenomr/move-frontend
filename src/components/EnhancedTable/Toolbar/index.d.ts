import React from 'react';

export interface IToolbar {
    title: string;
    actions: IAction[];
}

export interface IAction {
    name: string;
    icon: JSX.Element;
    link?: string;
    handle?: () => void;
}