import { IOptions } from './index.d'
import React, { useState } from 'react';
import { IconButton, Menu, MenuProps, withStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Option from './option';

const StyledMenu = withStyles({
  paper: {
      border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
      }}
      transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
      }}
      {...props}
  />
));

export default function Options(props: IOptions) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={(e) => { handleClick(e) }}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      > 
        {props.options.map((option, index) => (
          <Option
            key={index}
            type={option.type}
            id={props.id}
            icon={option.icon}
            name={option.name}
            handle={option.handle}
            link={option.link}
          />
        ))}
      </StyledMenu>
  </>
  )
}