import React, {useState} from 'react';
import ls from 'local-storage';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
  Input,
  List,
  ListItemSecondaryAction,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles({
  '@global': {
    '.MuiList-padding': {
      paddingTop: '0px',
    },
    '.MuiListItem-root': {
      cursor: 'pointer',
    },
  },
  sideBar: {
    margin: '1em 0',
  },
  listPrimaryTextBold: {
    fontWeight: 'bold',
  },
  selectedColor: {
    color: '#0080ff',
  },
  listText: {
    paddingLeft: '3em',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.14)',
    },
  },
  iconButton: {
    borderRadius: '50%',
    '&:hover': {
      boxShadow: 'inset 0 0 0 10rem #c7c7c7, 0 0 0 6px hsl(0, 0%, 78%)',
      backgroundColor: '#c7c7c7',
    },
    cursor: 'pointer',

  },
  clearIconSvg: {
    borderRadius: '50%',
    fontSize: '1em',
    marginLeft: '1.2em',
    boxShadow: 'inset 0 0 0 10rem red, 0 0 0 6px red',
    backgroundColor: 'red',
    color: 'white',
    '&:hover': {
      boxShadow: 'inset 0 0 0 10rem #c7c7c7, 0 0 0 6px hsl(0, 0%, 78%)',
      backgroundColor: '#c7c7c7',
    },
    cursor: 'pointer',
  },
  checkIconSvg: {
    borderRadius: '50%',
    fontSize: '1em',
    marginLeft: '1.2em',
    boxShadow: 'inset 0 0 0 10rem green, 0 0 0 6px green',
    backgroundColor: 'green',
    color: 'white',
    '&:hover': {
      boxShadow: 'inset 0 0 0 10rem #c7c7c7, 0 0 0 6px hsl(0, 0%, 78%)',
      backgroundColor: '#c7c7c7',
    },
    cursor: 'pointer',
  },
});

export default function SideBar(props) {
  const classes = useStyles();
  let tempLists = ls.get('lists');
  tempLists[0] = {label: 'All Tasks'};
  const [lists, setLists] = useState(tempLists);
  const [edit, setEdit] = useState(false);
  const [deleteList, setDeleteList] = useState([]);

  const onListItemClick = (event) => {
    props.setActiveList(event.currentTarget.id);
  };

  const onAddingNewList = (event) => {
    const value = event.currentTarget.value;
    if (event.keyCode === 13 && value) {
      const storage = ls.get('lists');
      storage[(new Date()).getTime()] = {label: value};

      ls.set('lists', storage);
      storage[0] = {label: 'All Tasks'};
      setLists(storage);
      event.currentTarget.value = '';
      event.currentTarget.blur();
    }
  };

  const onEditClick = () => {
    setEdit(prevState => !prevState);
  };

  const onDeleteClick = (event) => {
    const listId = parseInt(event.currentTarget.id.slice(3), 10);
    const tempLists = lists;
    delete tempLists[listId];
    setLists(Object.assign({}, tempLists));
    deleteList.push(listId);
  };

  function onCancelClick() {
    setEdit(prevState => !prevState);
    setLists(tempLists);
    setDeleteList([]);
  }

  function onCheckClick() {
    deleteList.forEach(listId => {
      delete tempLists[listId];
    });
    if (deleteList.length !== 0) {
      let tasks = ls.get('tasks');
      tasks = tasks.filter(task => deleteList.indexOf(parseInt(task.listId, 10)) === -1);
      if (deleteList.indexOf(parseInt(props.activeList, 10)) !== -1)
        props.setActiveList(0);
      else
        props.setActiveList(parseInt(props.activeList, 10));
      ls.set('tasks', tasks);
      ls.set("lists", tempLists);
    }
    setLists(tempLists);
    setDeleteList([]);
    setEdit(prevState => !prevState);
  }

  return (
      <div className={classes.sideBar}>
        <ListItem selected={true} ContainerComponent={'div'}
                  className={classes.listText}
                  classes={{selected: classes.selectedColor}}>
          <ListItemText primary="MY LISTS"
                        classes={{primary: classes.listPrimaryTextBold}}/>
          <ListItemSecondaryAction className={!edit ? classes.iconButton : ''}>
            {
              !edit ? <EditIcon fontSize={'small'} onClick={onEditClick}/> :
                  <>
                    <ClearIcon className={classes.clearIconSvg}
                               onClick={onCancelClick}/>
                    <CheckIcon className={classes.checkIconSvg}
                               onClick={onCheckClick}/>
                  </>
            }
          </ListItemSecondaryAction>
        </ListItem>
        <List>
          {
            Object.keys(lists).map(key => (edit && key == 0) ? null :
                (<ListItem id={key} key={key}
                           selected={props.activeList == key}
                           ContainerComponent={'div'}
                           onClick={onListItemClick}
                           className={classes.listText}
                           classes={{selected: classes.selectedColor}}>
                      <ListItemText primary={lists[key].label}/>
                      <ListItemSecondaryAction className={classes.iconButton}>
                        {
                          edit &&
                          <DeleteIcon id={'id:' + key} fontSize={'small'}
                                      onClick={onDeleteClick}/>
                        }
                      </ListItemSecondaryAction>

                    </ListItem>
                ),
            )
          }
          {!edit && <ListItem className={classes.listText}
                              classes={{selected: classes.selectedColor}}>
            <Input onKeyDown={onAddingNewList} disableUnderline={true}
                   placeholder={'+ New List'}/>
          </ListItem>}
        </List>
      </div>
  );
}