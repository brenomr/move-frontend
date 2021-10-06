import { Button, IconButton, Typography } from '@material-ui/core';
import React, { FormEvent, useEffect, useState } from 'react';
import { IFilter } from './index.d';
import { IParams } from '../../hooks/useData.d';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import './styles.scss'

export default function Filter(props: IFilter) {
  const [ fetchParams, setFetchParams ] = useState<IParams>({});
  const [ hidden, setHidden ] = useState(true);

  useEffect(() => {
    props.onFilter(fetchParams)
  }, [fetchParams]);

  const onFilter = (name: string, value: string) => {
    setFetchParams(previousState => ({
      ...previousState,
      ...{
        [name]: value
      }
    }));
  }

  const handleClear = (e: FormEvent) => {
    e.preventDefault();
    setFetchParams({});
  }

  return (
    <div className="main">
      <div className="title">
        <Typography variant="h6" id="tableTitle" component="div">
          {props.title}
        </Typography>
        <IconButton onClick={() => setHidden(!hidden)} aria-label="delete">
          {hidden ? <ArrowDropDownIcon /> : <ArrowDropUpIcon /> }
        </IconButton>
      </div>
      <div className={hidden === true ? "hidden" : "inputs"}>
        {props.filters.map(filter => (
          filter.element((value: any) => onFilter(filter.name, value), (fetchParams[filter.name] || ''))
        ))}
      </div>
      <div className={hidden === true ? "hidden" : "button"}>
        <Button
          variant="outlined"
          color="secondary"
          classes={{
            root: "cancel"
          }}
          onClick={handleClear}
        >
          Limpar dados
        </Button>
      </div>     
    </div>
  )

}