import { TableCell } from '@material-ui/core';
import React from 'react';

export default function Cell(data: any, index: number) {
  return (
    <>
      {index !== 0 && 
        <TableCell key={index} align="left">
          {data}
        </TableCell>
      }
    </>
  )
}