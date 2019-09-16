import React, {useState} from 'react';
import ls from "local-storage";
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Input, List, TextField} from '@material-ui/core';

const useStyles = makeStyles({
  "@global":{
    '.MuiList-padding':{
      paddingTop: "0px",
    },
    '.MuiListItem-root':{
      cursor: "pointer",
    }
  },
  sideBar: {
    margin: '1em 0',
  },
  listPrimaryTextBold: {
    fontWeight: "bold",
  },
  selectedColor: {
    color: '#0080ff',
  },
  listText: {
    paddingLeft: "3em",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.14)",
    },
  },

});


export default function SideBar(props) {
  const classes = useStyles();
  let tempLists = ls.get("lists");
  tempLists[0] = {label: "All Tasks"};
  const [lists, setLists] = useState(tempLists);
  console.log(lists, props.activeList);

  const onListItemClick = (event) => {
    console.log(event.currentTarget.id);
    props.setActiveList(event.currentTarget.id)
  };

  const onAddingNewList = (event) => {
    //console.log(event.keyCode, event.currentTarget.value);
    const value = event.currentTarget.value;
    if(event.keyCode === 13 && value){
      const storage = ls.get("lists");
      storage[(new Date()).getTime()] = {label: value};

      ls.set("lists", storage);
      storage[0] = {label: "All Tasks"};
      setLists(storage);
      event.currentTarget.value = "";
      event.currentTarget.blur();
    }
  };
  return (
      <div className={classes.sideBar}>
        <ListItem selected={true} className={classes.listText} classes={{ selected: classes.selectedColor}}>
          <ListItemText primary="MY LISTS"  classes={{primary: classes.listPrimaryTextBold}}/>
        </ListItem>
        <List>
          {
            Object.keys(lists).map( key => (
                <ListItem id={key}  key={key} selected={props.activeList == key} onClick = {onListItemClick} className={classes.listText} classes={{ selected: classes.selectedColor}}>
                  <ListItemText primary={lists[key].label} />
                </ListItem>
            ))
          }
          <ListItem className={classes.listText} classes={{ selected: classes.selectedColor}}>
            <Input onKeyDown={onAddingNewList} disableUnderline={true} placeholder={"+ New List"}/>
          </ListItem>
        </List>
      </div>
  );
}