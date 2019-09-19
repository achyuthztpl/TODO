import React, {useEffect, useState} from 'react';
import {
  makeStyles,
} from '@material-ui/core';
import ls from 'local-storage';
import TasksBody from './TasksBody';
import TaskCard from './TaskCard';

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
    flexFlow: 'row nowrap',
    height: '100%',
    overflowX: "auto"
  },
  mainContentChilds: {
    width: "50%",
    padding: '1em',
    height: '100%',
    color: "inherit",
  },

});

export default function MainBody(props) {
  const classes = useStyles();
  const listId = props.activeList;
  const listLabel = listId != 0 ? ls.get('lists')[listId].label : 'All Tasks';
  const tempTasks = listId == 0 ?
      ls.get('tasks') :
      ls.get('tasks').filter(obj => obj.listId == listId);
  const [tasks, setTasks] = useState(tempTasks);
  const [activeTask, setActiveTask] = useState(null);
  useEffect(() => {
    setTasks(tempTasks);
  }, [listId]);

  const setTaskToLocalStorage = (task) => {
    let tasks = ls.get('tasks');
    if (!tasks)
      tasks = [];
    //console.log(task, tasks);
    if (tasks.findIndex(obj => obj.timestamp === task.timestamp) !== -1)
      tasks = tasks.map(obj => obj.timestamp === task.timestamp ? {...task} : obj);
    else
      tasks.push(task);
    console.log(tasks);
    ls.set('tasks', tasks);
    setTasks(tasks.filter(obj => listId != 0 ? obj.listId == listId : true));
    //return tasks;
  };

  return (
      <div className={classes.root}>
        <div><h1 className={classes.heading}>{listLabel}</h1></div>
        <div className={classes.mainContent}>
          <div className={classes.mainContentChilds}>
            <TasksBody setTasks={setTasks} tasks={tasks}
                       activeList={props.activeList} setActiveTask={setActiveTask}
                       setTaskToLocalStorage={setTaskToLocalStorage}/>
          </div>

          <div className={classes.mainContentChilds}>
            <TaskCard aciveList={props.activeList}
                      setTasks={setTasks} tasks={tasks} activeTask={activeTask}
                      setTaskToLocalStorage={setTaskToLocalStorage}/>
          </div>
        </div>
      </div>
  );
}