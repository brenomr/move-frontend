import { IFilterElements } from '../Filter/index.d';
import { IParams } from '../Filter/index.d';
import { ITableProps } from '../EnhancedTable/index.d';

export interface ITableFilter extends ITableProps {
  url: string;
  filterTitle: string;
  filters: IFilterElements[];
}