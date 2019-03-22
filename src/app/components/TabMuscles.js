import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import PhoneIcon from '@material-ui/icons/Phone';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    overflowX:'hidden'
  },
  tabLabel: {
    fontSize: '120%'
  },
  overwriteTab: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

const TabMuscles = ({ muscles, category, onSelect, classes}) => {
  muscles = muscles.map(item => item)
  const index = category
    ? muscles.findIndex(group => group === category) + 1
    : 0;

  const indexSelected = (e, index) =>
    onSelect(index === 0 ? '' : muscles[index - 1]);

  return (
    <React.Fragment>
    <div className={classes.root}>
        <Tabs
          value={index}
          onChange={indexSelected}
          variant="scrollable"
          indicatorColor="primary"
          textcolor="primary"
          classes={{
            flexContainer: classes.overwriteTab
          }}
        >
            <BottomNavigationAction label="Top 5" icon={<FavoriteIcon />} />
            {muscles.map(group => (
              <BottomNavigationAction key={group} showLabel={true} label={<span className={classes.tabLabel}>{group}</span>} />
            ))}
        </Tabs>
        
   </div>
  </React.Fragment>
  );
};

export default withStyles(styles)(TabMuscles)