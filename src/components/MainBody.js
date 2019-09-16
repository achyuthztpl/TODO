import React, {useEffect, useState} from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import {
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemText,
  makeStyles, TextField,
} from '@material-ui/core';
import ls from "local-storage";

const useStyles = makeStyles({
  root: {
    padding: '2em',
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  heading: {
    margin: '0px',
  },
  mainContent: {
    display: 'flex',
    flexFlow: 'row',
    height: '100%',
  },
  mainContentChilds: {
    flex: '1 0',
    padding: '1em',
    height: '100%',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
  },
  cardContents: {
    flex: '2 1 auto',
    overflowY: 'auto',
  },
  cardActions: {
    flex: '0 1 auto',

  },
  list: {},
  textField: {
    flexGrow: 1,
  },
  arrowIcon: {
    margin: '0 1em',
    borderRadius: '50%',
    padding: "inherit",
    borderStyle: "solid",
    color: "rgb(204, 204, 204)",
    "&:hover": {
      backgroundColor: "#0080ff",
      color: "#0080ff",
    }

  },

});

export default function MainBody(props) {
  const classes = useStyles();
  const listId = props.activeList;
  //console.log(ls.get("lists"));
  const listLabel = listId != 0 ? ls.get("lists")[listId].label : "All Tasks";
  const tempTasks = listId == 0 ? ls.get("tasks") : ls.get("tasks").filter(obj => obj.listId == listId);
  const [tasks, setTasks] = useState(tempTasks);
  useEffect(() => {
    setTasks(tempTasks);
  }, [listId]);

  const onAddingNewTask = (event) => {
    const isButton = event.currentTarget.id === "NewTaskButton";
    const value = !isButton ? event.currentTarget.value : document.getElementById("NewTaskInput").value;
    //console.log(value);
    if ( (event.keyCode === 13 || isButton) && value) {
      let tasks = ls.get("tasks");
      if(!tasks)
        tasks = [];
      //const listId = lists.find(obj => obj.label === props.activeList);
      tasks.push({listId, task: value, timestamp: (new Date()).getTime(), completed: false});
      ls.set("tasks", tasks);

      setTasks(tasks.filter(obj => listId != 0 ? obj.listId == listId: true));
      if(isButton)
        document.getElementById("NewTaskInput").value = "";
      else
        event.currentTarget.value = "";
    }
  };
  return (
      <div className={classes.root}>
        <div><h1 className={classes.heading}>{listLabel}</h1></div>
        <div className={classes.mainContent}>
          <div className={classes.mainContentChilds}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContents}>
                <List className={classes.list}>
                  {
                    tasks.length === 0 &&
                    <p style={{textAlign: "center"}}>No tasks yet.</p>

                  }
                  {tasks.map(
                      obj => <ListItem key={obj.timestamp}>
                        <ListItemText primary={obj.task}/>
                      </ListItem>)}
                </List>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <TextField
                    className={classes.textField}
                    variant="outlined"
                    placeholder={'Click to quickly add a task'}
                    inputProps={{onKeyDown: onAddingNewTask, id: "NewTaskInput"}}
                />
                <div id="NewTaskButton" className={classes.arrowIcon} onClick={onAddingNewTask}><ArrowUpwardIcon color={"primary"}/></div>
              </CardActions>
            </Card>
          </div>

          <div className={classes.mainContentChilds}>

          </div>
        </div>
      </div>
  );
}