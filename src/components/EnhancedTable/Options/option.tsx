import { IOption } from './index.d';
import React, { useEffect, useState } from 'react';
import { ListItemIcon, MenuItem, withStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import theme from 'styles/theme';

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Option(props: IOption) {
  const [id, setId] = useState('');

  useEffect(() => {
    if (props.id !== undefined) {
      setId(props.id);
    }
  }, [props.id])

  return (
    <>
      {props.type === 'link' &&
        <NavLink to={props.link + id} key={props.name} style={{ color: theme.colors.grayDark }}>
          <StyledMenuItem >
            <ListItemIcon>
              {props.icon}
            </ListItemIcon>
            <div className="actionText">{props.name}</div>
          </StyledMenuItem>
        </NavLink>
      }
      {props.type === 'button' &&
        <StyledMenuItem onClick={() => {
          props.handle(id);

        }} key={props.name}>
          <ListItemIcon>
            {props.icon}
          </ListItemIcon>
          <div className="actionText">{props.name}</div>
        </StyledMenuItem>
      }
    </>

  )
}