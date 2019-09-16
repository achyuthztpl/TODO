import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {List} from '@material-ui/core';

const useStyles = makeStyles({
  sideBar: {
    margin: '1em 0',
  },
  listItem: {
    "&:hover": {
      backgroundColor: "#f6f6f6",
    }
  }
});
export default function SideBar(props) {
  const classes = useStyles();
  return (
      <div className={classes.sideBar}>
        <p  onClick={() => {console.log("adasd")}} >Hello</p>
          {
            ['List1', 'List2'].map(value => (
                <ul key={value}>{value}</ul>
            ))
          }
        <List>
          <ListItem button>
            <ListItemText primary="Trash" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Spam" />
          </ListItem>
        </List>
      </div>
  );
}