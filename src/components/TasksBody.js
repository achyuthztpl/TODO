import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemText, makeStyles,
  Paper, TextField,
} from '@material-ui/core';
import ls from 'local-storage';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles({
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
        padding: 'inherit',
        borderStyle: 'solid',
        color: 'rgb(204, 204, 204)',
        '&:hover': {
          backgroundColor: '#0080ff',
          color: '#0080ff',
        },
      },
      task: {
        marginBottom: '10px',
        '&:hover': {
          borderColor: '#0080ff',
          borderWidth: '1px',
          borderStyle: 'solid',
          padding: "7px 15px"
        },
      },
      taskFinish: {
        borderColor: '#CCCCCC',
        borderRadius: '50%',
        borderStyle: 'solid',
        borderWidth: '1px',
        backgroundColor: '#CCCCCC',
        height: '20px',
        width: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '1em',
      },
      taskFinishIcon: {
        color: 'white',
        fontSize: '0.8em',
      },
      finisedTaskText: {
        textDecoration: 'line-through',
        color: '#CCCCCC',
        textDecorationStyle: 'solid',
        display: 'inline-block',
        width: '100%',
        position: 'relative',
        '&::after': {
          content: '\'\'',
          borderBottom: '1px solid #CCCCCC',
          position: 'absolute',
          left: 0,
          top: '50%',
          width: '100%',
        },
      },
    },
);
export default function TasksBody(props) {
  const classes = useStyles();
  const listId = props.activeList;
  const setTasks = props.setTasks;
  const tasks = props.tasks;

  const onAddingNewTask = (event) => {
    const isButton = event.currentTarget.id === 'NewTaskButton';
    const value = !isButton ?
        event.currentTarget.value :
        document.getElementById('NewTaskInput').value;
    //console.log(value);
    if ((event.keyCode === 13 || isButton) && value) {
      let tasks = ls.get('tasks');
      if (!tasks)
        tasks = [];
      tasks.push({
        listId,
        task: value,
        timestamp: (new Date()).getTime(),
        completed: false,
      });
      ls.set('tasks', tasks);

      setTasks(tasks.filter(obj => listId != 0 ? obj.listId == listId : true));
      if (isButton)
        document.getElementById('NewTaskInput').value = '';
      else
        event.currentTarget.value = '';
    }
  };

  const onFinishedClick = (event) => {
    const timestamp = event.currentTarget.parentNode.id;
    let tasks = ls.get('tasks');
    if (!tasks)
      tasks = [];
    tasks.map(obj => {
      if (obj.timestamp === parseInt(timestamp, 10))
        obj.completed = !obj.completed;
      return obj;
    });

    ls.set('tasks', tasks);
    setTasks(tasks);
  };

  const onTaskRemoveClick = (event) => {
    const timestamp = event.currentTarget.parentNode.id;
    let tasks = ls.get('tasks');
    if (!tasks)
      tasks = [];
    tasks = tasks.filter(obj => obj.timestamp !== parseInt(timestamp, 10));

    ls.set('tasks', tasks);
    setTasks(tasks);
  };

  return (
      <>
        <Card className={classes.card}>
          <CardContent className={classes.cardContents}>
            <List className={classes.list}>
              {
                tasks.length === 0 &&
                <p style={{textAlign: 'center'}}>No tasks yet.</p>

              }
              {tasks.map(
                  obj =>
                      <ListItem id={obj.timestamp} className={classes.task}
                                key={obj.timestamp}
                                component={Paper}>
                            <span className={classes.taskFinish} style={{
                              backgroundColor: obj.completed ? '' : 'white',
                            }} onClick={onFinishedClick}>
                              <CheckIcon className={classes.taskFinishIcon}
                                         style={{
                                           visibility: obj.completed ?
                                               '' :
                                               'hidden',
                                         }}
                              />
                            </span>
                        <ListItemText primary={obj.task}
                                      classes={{
                                        primary: obj.completed ?
                                            classes.finisedTaskText :
                                            '',
                                      }}/>
                        <span className={classes.taskFinish}
                              onClick={onTaskRemoveClick}
                              style={{
                                marginRight: '0px',
                                visibility: obj.completed ? '' : 'hidden',
                              }}>
                              <ClearIcon className={classes.taskFinishIcon}/>
                            </span>
                      </ListItem>,
              )}
            </List>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <TextField
                className={classes.textField}
                variant="outlined"
                placeholder={'Click to quickly add a task'}
                autoFocus={true}
                inputProps={{
                  onKeyDown: onAddingNewTask,
                  id: 'NewTaskInput',
                }}
            />
            <div id="NewTaskButton" className={classes.arrowIcon}
                 onClick={onAddingNewTask}>
              <ArrowUpwardIcon
                  color={'primary'}/>
            </div>
          </CardActions>
        </Card>
      </>
  );
}