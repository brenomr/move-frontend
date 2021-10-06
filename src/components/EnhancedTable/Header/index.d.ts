export interface ICell{
  [key: string]: any;
}

export type Order = 'asc' | 'desc';

export interface IHeader{
  cells: ICell[],
  order: Order,
  orderBy: string | number,
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
}