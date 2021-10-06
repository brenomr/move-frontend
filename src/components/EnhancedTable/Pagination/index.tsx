import TablePagination from '@material-ui/core/TablePagination';
import React, { useEffect, useState } from 'react';
import { IPagination } from './index.d';

const Pagination: React.FC<IPagination> = (props: IPagination) => {
  const [ state, setState ] = useState<IPagination>({
    page: 0,
    component: 'div',
    rowsPerPage: 0,
    count: 0,
    quantityOfRows: [ 0 ],
    onChangePage: props.onChangePage,
    onChangeRowsPerPage: props.onChangeRowsPerPage,
  });

  useEffect(() => {
    setState({
      ...state,
      page: props.page,
      rowsPerPage: props.rowsPerPage,
      count: props.count
    })
  }, [props.page, props.rowsPerPage, props.count ])

  return (
    <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.count?props.count:0}
        rowsPerPage={props.rowsPerPage}
        page={props.page}
        onPageChange={props.onChangePage}
        onChangeRowsPerPage={props.onChangeRowsPerPage}
    />
  )
}

export { Pagination };