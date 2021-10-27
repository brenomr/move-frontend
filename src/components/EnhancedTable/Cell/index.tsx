import { TableCell } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const XTableCell = styled(TableCell)`
  img{
    max-height: 200px;
    max-width: 400px;
    border-radius: 20px;
  }
`

export default function Cell(data: any, index: number) {
  return (
    <>
      {index !== 0 &&
        <XTableCell key={index} align="left">
          {data}
        </XTableCell>
      }
    </>
  )
}