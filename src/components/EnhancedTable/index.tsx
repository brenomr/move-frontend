import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import React, { useState } from 'react';
import useStyles from 'styles/styles';
import { ITableProps } from './index.d';
import EmptyStateIcon from "../../assets/images/emptystate.svg";
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.ts';
import { Header } from './Header';
import { Pagination } from './Pagination';
import Rows from './Rows';
import { Toolbar } from './Toolbar';
import { XNoData, XTablePaper } from './styles';

const Table: React.FC<ITableProps> = (props: ITableProps) => {
  const classes = useStyles();
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>(props.orderBy as string);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <XTablePaper>
      <Toolbar
        actions={props.actions}
        title={props.title}
      />
      <TableContainer>
        {(props.rows.total === 0 || !props.rows.total) ? (
          <>
            {props.loading ? (
              <XNoData className="noData">
                <CircularProgress />
              </XNoData>
            ) : (
              <XNoData className="noData">

                <img src={EmptyStateIcon} className="noDataSvg" alt="Sem dados" />

                <p>Nenhum registro disponível para exibição</p>
              </XNoData>
            )}
          </>
        ) : (
          <TableMUI
            className={classes.table}
            size='medium'
          >
            <Header
              onRequestSort={handleRequestSort}
              orderBy={orderBy}
              order={order}
              cells={props.cells}
            />
            <TableBody>
              <Rows
                options={props.options}
                rows={props.rows.data}
                order={order}
                orderBy={orderBy}
                page={page}
                rowsPerPage={rowsPerPage}
                selectedCells={props.selectedCells}
              />
            </TableBody>
          </TableMUI>
        )}
        <Pagination
          quantityOfRows={[5, 10, 25]}
          component="div"
          count={props.rows.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={(event: unknown, newPage: number) => {
            setPage(newPage)
          }}
          onChangeRowsPerPage={(event: React.ChangeEvent<HTMLInputElement>) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>
    </XTablePaper>
  )
}

export { Table };