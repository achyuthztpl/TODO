import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import {withStyles} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';

const styles = {
  navBar: {
    backgroundColor: 'white',
  },
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuIcon: {
    color: 'grey',
    padding: "0px",
    marginLeft: "12px",
    marginRight: "12px",
  },
  add: {
    backgroundColor: '#0080ff',
    color: 'white',
    padding: '0 1.5em',
    marginLeft: "1em",
    height: "36px",
  },
};

function NavBar(props) {
  const classes = props.classes;
  const handleNavMenuClick = (event) => {
    props.onNavMenuClick();
  };
  return (
      <div style={{zIndex: 100}}>
        <AppBar position="static" className={classes.navBar}>
          <Toolbar style={{paddingTop: '1em', paddingBottom: '1em'}}>
            <IconButton edge="start" aria-label="menu"
                        className={classes.menuIcon} onClick={handleNavMenuClick}>
              <MenuIcon/>
            </IconButton>
            <Fab variant="extended" aria-label="Add" className={classes.add}>
              <AddIcon/>
              New
            </Fab>
            <div className={classes.grow}/>
          </Toolbar>
        </AppBar>
      </div>
  );
}

export default withStyles(styles)(NavBar);