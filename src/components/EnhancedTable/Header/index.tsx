import React from 'react';
import { IHeader } from './index.d';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import useStyles from 'styles/styles';

function EnhancedTableHead(props: IHeader) {
  const { order, orderBy, onRequestSort } = props;
    const classes = useStyles();
    const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding='default' />
                {props.cells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        padding='none'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const Header: React.FC<IHeader> = (props: IHeader) => {

    return (
        <EnhancedTableHead
            order={props.order}
            orderBy={props.orderBy}
            onRequestSort={props.onRequestSort}
            cells={props.cells}
        />
    )
}

export { Header };