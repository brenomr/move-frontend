import { TableCell, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Cell from '../Cell';
import Options from '../Options';
import { IRows } from './index.d';

export default function Rows(props: IRows) {
  const [ rows, setRows ] = useState([])

  useEffect(() => {
    const result = props.rows.map((row: any) => (
      props.selectedCells(row)
    ));

    setRows(result);
    
  }, [props.rows]);

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator<Key extends keyof any>(
    order: 'asc' | 'desc',
    orderBy: Key,
  ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  return (
    <>
      {rows.length > 0 && stableSort(rows, getComparator(props.order, props.orderBy))
      .slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
      .map((row) => {
        return (
        <TableRow
          hover
          role="checkbox"
          key={row.id}
        >
        <TableCell padding="checkbox" />
        {Object.values(row).map(Cell)}
        <TableCell align="right">
          <Options 
            key={row.id}
            id={row.id as string}
            options={props.options}
          />
        </TableCell>
      </TableRow>
      )})
      }
    </>
  )
}