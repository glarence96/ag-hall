import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar style={{ margin: 0 }} position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            <Link underline="none" color="inherit" href="/">AG Hall</Link>
          </Typography>
          <Button color="inherit" href="/">
            Home
          </Button>
          <Button color="inherit" href="/add-range">
            Book Now
          </Button>
          <Button color="inherit" href="/check">
            Check
          </Button>
          <Button color="inherit" href="/admin">
            Admin
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}