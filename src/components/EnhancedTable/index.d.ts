import React from 'react';
import { IHeader } from './header.d';
import { IOption } from './Options/index.d';
import { ICell } from './Header/index.d'
import { IToolbar } from './Toolbar/index.d';
export interface IRow {
    [key: string]: any;
}

export interface ITableProps extends IToolbar {
  cells: ICell[],
  options: IOption[];
  selectedCells: (value: IRow) => {}
  rows: any;
  loading: boolean;
  orderBy: keyof ICell;
}