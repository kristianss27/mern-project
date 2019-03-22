import React from "react";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    overflowX:'hidden'
  }
});

const Footer = (props) => {


  return (
    <React.Fragment>
    </React.Fragment>
  );
};

export default withStyles(styles)(Footer)