import {makeStyles} from '@material-ui/core/styles';
import React, {useState} from 'react';
import SideBar from './SideBar';
import MainBody from './MainBody';

const useStyles = makeStyles({
  '@global': {
    'body': {
      color: '#4a4a4a',
    },
    '.MuiOutlinedInput-notchedOutline': {
      borderRadius: '4em',

    },
    '.MuiSvgIcon-colorPrimary': {
      color: 'rgb(204, 204, 204)',
    },
    ".MuiTypography-body1": {
      display: "inline-block",
      width: "100%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    }
  },
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
    width: '250px',
    minWidth: "250px",
    transform: 'none',
  },
  sideBarOff: {
    width: '0px',
    minWidth: "0px",
    opacity: 0,
    transform: 'translateX(-250px)',
  },
  main: {
    width: '100%',
    backgroundColor: '#f6f6f6',
    zIndex: 9,
    position: 'relative',
  },
});

function Body(props) {
  const classes = useStyles();
  const [activeList, setActiveList] = useState(0);
  return (
      <div className={classes.root}>
        <div className={`${classes.sideBar} ${!props.navOpenStatus ?
            classes.sideBarOff :
            ''}`}>
          <SideBar activeList={activeList} setActiveList={setActiveList}/>
        </div>
        <div className={classes.main}>
          <MainBody activeList={activeList}/>
        </div>
      </div>
  );
}

export default Body;
