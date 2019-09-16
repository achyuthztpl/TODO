import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import SideBar from './SideBar';

const useStyles = makeStyles({
  root: {
    flex: '1 1 auto',
    display: 'flex',
    position: 'relative',
  },
  sideBar: {
    position: 'relative',
    top: 0,
    bottom: 0,
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    zIndex: 10,
    backgroundColor: 'white',
    transition: 'width, opacity, transform',
    transitionTimingFunction: 'ease-out',
    transitionDuration: '.5s',
    opacity: 1,
    width: '260px',
    transform: 'none',
  },
  sideBarOff: {
    width: '0px',
    opacity: 0,
    transform: 'translateX(-260px)',
  },
  main: {
    width: '100%',
    backgroundColor: '#f6f6f6',
    zIndex: 9,
  },
});

function Body(props) {
  const classes = useStyles();
  return (
      <div className={classes.root}>
        <div className={`${classes.sideBar} ${!props.navOpenStatus ?
            classes.sideBarOff :
            ''}`}>
          <SideBar />
        </div>
        <div className={classes.main}>

        </div>
      </div>
  );
}

export default Body;
