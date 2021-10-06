import { createStyles, makeStyles, Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    grid: {
      display: 'flex',
      '@media screen and (max-width: 991px)': {
        display: 'block',
      },
      '& > *': {
        margin: '8px !important',
        width: '100%',
        '@media screen and (max-width: 991px)': {
          width: '100%',
        }
      },

    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    pass: {
      display: 'abolsute',

      '& > *': {
        width: '100%',
        '@media screen and (max-width: 991px)': {
          width: '100%',
        }
      },
    },
    button: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    modal: {
      position: 'absolute',
      alignContent: 'center',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },

  }),
);
export default useStyles