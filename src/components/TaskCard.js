import React, {useEffect, useState} from 'react';
import {
  Card,
  CardContent,
  makeStyles,
  TextareaAutosize,
  Typography,
  Button
} from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles({
  card: {
    height: '100%',
    color: "inherit",
  },
  cardContent: {
    height:"100%",
    overflowY: 'auto',
    padding: "1em",
  },
  taskInputDiv: {
    backgroundColor: "#f6f6f6",
    padding: "4px 8px",
    borderRadius: "5px",
    marginTop: "10px",
    color: "inherit",
    "&:focus": {
      backgroundColor: "#f6f6f6",
      border: "none",
      outline: "none",
    }
  },
  taskInput: {
    width: "100%",
    border: "none",
    resize: "none",
    color: "inherit",
    backgroundColor: "#f6f6f6",
    "&:focus": {
      outline: "none",
    }
  },
  taskSubheading: {
    marginTop: "0.75em",
    fontSize: "0.9em",
  },
  setTimeButton: {
    marginTop: "0.75em",
    color: "inherit",
  },
  eventIcon: {
    marginRight: "5px",
    color: "#CCCCCC",
  }
});

export default function TaskCard(props) {
  const classes = useStyles();
  const tasks = props.tasks;
  const task = tasks.find(obj => obj.timestamp == parseInt(props.activeTask, 10));
  const [calenderIsOpen, setCalenderIsOpen] = useState(false);
  //console.log(tasks, task);
  let noteSaveEndTimer, taskSaveEndTimer;
  let prevValue=task ? task.task[0] : "A";
  let noteRef = React.createRef();
  let taskRef = React.createRef();

  useEffect(() => {
    if(task) {
      noteRef.current.value = task.notes;
      taskRef.current.value = task.task;
    }
  }, [props.activeTask]);

  const onCalenderChange = (date, string) => {
    props.setTaskToLocalStorage({
      ...task,
      reminderTime: date.getTime(),
    });
  };

  const onNotesChange = (event) => {
    clearTimeout(noteSaveEndTimer);
    const value = event.currentTarget.value;
    noteSaveEndTimer = setTimeout(() => {
      props.setTaskToLocalStorage({
        ...task,
        notes: value,
      })
    }, 1000);

  };

  const onTaskNameChange = (event) => {
    clearTimeout(taskSaveEndTimer);
    const value = event.currentTarget.value;
    if(value.length === 0)
      event.currentTarget.value = prevValue;
    else
      prevValue = value;
    taskSaveEndTimer = setTimeout(() => {
      props.setTaskToLocalStorage({
        ...task,
        task: value.length === 0 ? prevValue : value,
      })
    }, 1000);

  };


  console.log("task update");
  if(!task) return null;
  return (
      <>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <div className={classes.taskInputDiv}>
              <TextareaAutosize ref={taskRef} className={classes.taskInput}
                                onChange={onTaskNameChange}
                                defaultValue={task.task || ""}/><
              /div>
            <Typography variant={"overline"} display={"block"} className={classes.taskSubheading}>REMIND ME ABOUT THIS</Typography>
            <Button variant="outlined" className={classes.setTimeButton} fullWidth={true} onClick={() => setCalenderIsOpen(true)}>
              <EventIcon fontSize={"small"} className={classes.eventIcon}/>
              {task.reminderTime ? (new Date(task.reminderTime).toLocaleDateString()): "Set Date"}
            </Button>
            <MuiPickersUtilsProvider utils={DateFnsUtils} style={{display: "none"}}>
                <KeyboardDatePicker
                    style={{display: "none"}}
                    variant={"dialog"}
                    format="MM/dd/yyyy"
                    open={calenderIsOpen}
                    onOpen={() => setCalenderIsOpen(true)}
                    onClose={() => setCalenderIsOpen(false)}
                    onChange={onCalenderChange}
                    value={task.reminderTime}
                    margin="normal"
                />
            </MuiPickersUtilsProvider>
            <Typography variant={"overline"} display={"block"} className={classes.taskSubheading}>NOTES</Typography>
            <div className={classes.taskInputDiv}>
              <TextareaAutosize className={classes.taskInput}
                                placeholder={"Insert your notes here"}
                                defaultValue={task.notes || ""}
                                ref={noteRef}
                                onChange={onNotesChange}/>
            </div>
          </CardContent>
        </Card>
      </>
  );
}