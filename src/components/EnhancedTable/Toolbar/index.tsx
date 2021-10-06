import { IToolbar } from './index.d';
import { useToolbarStyles } from './styles';
import ToolbarMUI from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { NavLink } from 'react-router-dom';


const Action = (data: any, index: number) => (
    <React.Fragment key={index}>
        {data.handle && !data.link &&
            <Tooltip title={data.name}>

                <IconButton onClick={() => data.handle && (data.handle())} aria-label={data.name}>
                    {data.icon}
                </IconButton>
            </Tooltip>
        }
        {data.link && !data.handle &&
            <Tooltip title={data.name}>
                <IconButton aria-label={data.name}>
                    <NavLink to={data.link}>{data.icon}</NavLink>
                </IconButton>
            </Tooltip>
        }
    </React.Fragment>
);

const Toolbar: React.FC<IToolbar> = (props: IToolbar) => {
    const classes = useToolbarStyles();

    return (
        <ToolbarMUI>
            <Typography className={classes.title} variant="h4" id="tableTitle" component="div">
                {props.title}
            </Typography>
            {props.actions.map(Action)}
        </ToolbarMUI >
    )
}

export { Toolbar };