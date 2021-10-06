import { IOption } from '../Options/index.d'

export interface IRow {
  [key: string]: any;
}

export interface IRows {
  rows: any;
  options: IOption[];
  order: 'asc' | 'desc';
  orderBy: string;
  page: number;
  rowsPerPage: number;
  selectedCells: (value: IRow) => {};
}