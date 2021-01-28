import React from "react";
import { Button, ListItem, ListItemText } from "@material-ui/core";
import { Done, RotateLeft, HighlightOff } from "@material-ui/icons";

function Todo(props) {
  const {
    todo,
    user,
    toggleStatusPending,
    toggleStatusCompleted,
    deleteTodo,
  } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ListItem>
        <ListItemText
          primary={todo.text}
          secondary={todo.complete ? "Done" : "Pending"}
          style={{ textDecoration: todo.complete ? "line-through" : "" }}
        />
      </ListItem>
      {todo.complete ? (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => toggleStatusPending(todo.id)}
        >
          <RotateLeft />
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => toggleStatusCompleted(todo.id)}
        >
          <Done />
        </Button>
      )}
      &nbsp;
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={() => deleteTodo(todo.id)}
      >
        <HighlightOff />
      </Button>
    </div>
  );
}

export default Todo;
