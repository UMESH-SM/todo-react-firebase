import React, { useEffect } from "react";
import Todo from "./Todo";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  listIcon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function TodoPage(props) {
  const {
    user,
    logout,
    text,
    setText,
    todos,
    setTodos,
    getTodos,
    handleTodoAdd,
    toggleStatusPending,
    toggleStatusCompleted,
    deleteTodo,
  } = props;
  useEffect(() => {
    getTodos();
  }, []);

  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.listIcon}
              color="inherit"
              aria-label="menu"
            >
              <ListAltIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              TODO APP
            </Typography>
            <Button color="inherit" onClick={logout}>
              <ExitToAppIcon />
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <form onSubmit={(e) => handleTodoAdd(e)}>
          <input
            className="todoInput"
            type="text"
            placeholder="todo"
            onChange={(e) => setText(e.target.value)}
            value={text}
            required
          />
          &nbsp;
          <Button variant="contained" color="primary" type="submit">
            ADD
          </Button>
        </form>
      </div>
      <br></br>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {todos.map((todoItem) => {
          return (
            <Todo
              key={todoItem.id}
              todo={todoItem}
              user={user}
              toggleStatusPending={toggleStatusPending}
              toggleStatusCompleted={toggleStatusCompleted}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </div>
    </>
  );
}

export default TodoPage;
