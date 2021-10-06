import React, { useState } from 'react';
import useData from '../../hooks/useData';
import Filter from '../Filter';
import { Table } from '../EnhancedTable';
import { ITableFilter } from './index.d';

export default function TableFilter (props: ITableFilter) {
  const [ loading, setLoading ] = useState(true);
  const [ data, setParams ] = useData(props.url, setLoading);

  return (
    <>
      <Filter 
        title={props.filterTitle}
        filters={props.filters}
        onFilter={setParams}
      />
      <Table 
        title={props.title}
        actions={props.actions}
        orderBy={props.orderBy}
        rows={data}
        loading={loading}
        cells={props.cells}
        options={props.options}
        selectedCells={props.selectedCells}
      />
    </>
  )
}