import { Dispatch } from "react";

export interface IFilterElements {
  name: string;
  element: (onFilter, value: string) => JSX.Element;
}

export interface IFilter {
  title: string;
  onFilter: React.Dispatch<React.SetStateAction<IParams>>;
  filters: IFilterElements[]
}