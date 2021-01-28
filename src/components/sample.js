import React, { Component } from "react";
import shortid from "shortid";
import db from "../firebase_config";
import firebase from "firebase";

class TodoPage extends Component {
  state = {
    todo: [],
    text: "",
    id: null,
    complete: false,
    show: "all",
  };

  componentDidMount() {
    let arr = [];
    db.collection("todos").onSnapshot(function (query) {
      query.docs.forEach((doc) => {
        arr.push(doc.data());
      });
    });
    this.setState({ todo: arr });
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    db.collection("todos").add({
      id: shortid.generate(),
      todo: this.state.text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      completed: false,
    });

    // this.setState({
    //   todo: [
    //     {
    //       id: shortid.generate(),
    //       text: this.state.text,
    //       complete: this.state.complete,
    //     },
    //     ...this.state.todo,
    //   ],
    //   id: null,
    //   text: "",
    //   complete: false,
    //   show: "all",
    // });
  };

  deleteItem = (id) => {
    this.setState({
      todo: this.state.todo.filter((item) => item.id !== id),
    });
  };

  toggleComplete = (id) => {
    this.setState({
      todo: this.state.todo.map((todoItem) => {
        if (todoItem.id === id) {
          return {
            ...todoItem,
            complete: !todoItem.complete,
          };
        } else {
          return todoItem;
        }
      }),
    });
  };

  deleteAllCompleted = () => {
    this.setState({
      todo: this.state.todo.filter((todoItem) => todoItem.complete === false),
    });
  };

  toggleAllCompleted = () => {
    this.setState({
      todo: this.state.todo.map((todoItem) => {
        return {
          ...todoItem,
          complete: true,
        };
      }),
    });
  };

  toggleAllActive = () => {
    this.setState({
      todo: this.state.todo.map((todoItem) => {
        return {
          ...todoItem,
          complete: false,
        };
      }),
    });
  };

  render() {
    let todoShow = [];

    if (this.state.show === "all") {
      todoShow = this.state.todo;
    } else if (this.state.show === "active") {
      todoShow = this.state.todo.filter(
        (todoItem) => todoItem.complete === false
      );
    } else if (this.state.show === "completed") {
      todoShow = this.state.todo.filter(
        (todoItem) => todoItem.complete === true
      );
    }

    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <br></br>
            <input
              type="text"
              placeholder="todo"
              onChange={this.handleChange}
              value={this.state.text}
              style={{ width: "20%", padding: "5px" }}
            ></input>
            <button
              type="submit"
              style={{ backgroundColor: "lightgreen", padding: "5px 10px" }}
            >
              Add
            </button>
          </form>
        </div>
        <br></br>
        <div style={{ color: "white" }}>
          {todoShow.length ? (
            todoShow.map((todoItem, pos) => (
              <div key={todoItem.id} style={{ color: "white" }}>
                <table align="center">
                  <td>{pos + 1}</td>
                  <td style={{ width: "300px" }}>
                    <span
                      onClick={() => this.toggleComplete(todoItem.id)}
                      style={{
                        textDecoration: todoItem.complete
                          ? "line-through"
                          : null,
                      }}
                    >
                      {todoItem.todo}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => this.deleteItem(todoItem.id)}
                      style={{
                        backgroundColor: "red",
                        borderRadius: "50%",
                        padding: "1px 4.5px",
                        border: "none",
                      }}
                    >
                      <b>x</b>
                    </button>
                  </td>
                </table>
              </div>
            ))
          ) : (
            <div style={{ color: "orange" }}>
              <br></br>No Todo's Found.
            </div>
          )}
          <br></br>
          <div style={{ color: "skyblue", fontSize: "20px" }}>
            Todo's remaining :{" "}
            <b>
              {
                this.state.todo.filter(
                  (todoItem) => todoItem.complete === false
                ).length
              }
            </b>
          </div>
          <br></br>
          <div>
            <button
              onClick={() => {
                this.setState({
                  show: "all",
                });
              }}
              style={{
                backgroundColor: this.state.show === "all" ? "orange" : null,
                padding: "3px 10px",
              }}
            >
              All
            </button>
            <button
              onClick={() => {
                this.setState({
                  show: "active",
                });
              }}
              style={{
                backgroundColor: this.state.show === "active" ? "orange" : null,
                padding: "3px 10px",
              }}
            >
              Active
            </button>
            <button
              onClick={() => {
                this.setState({
                  show: "completed",
                });
              }}
              style={{
                backgroundColor:
                  this.state.show === "completed" ? "orange" : null,
                padding: "3px 10px",
              }}
            >
              Completed
            </button>
          </div>
          <br></br>
          <div>
            {this.state.todo.filter((todoItem) => todoItem.complete === false)
              .length ? (
              <button
                onClick={this.toggleAllCompleted}
                style={{
                  backgroundColor: "skyblue",
                  textDecoration: "line-through",
                  padding: "2px 5px",
                }}
              >
                Mark All Completed
              </button>
            ) : null}
            {this.state.todo.filter((todoItem) => todoItem.complete === true)
              .length === this.state.todo.length &&
            this.state.todo.length > 0 ? (
              <button
                onClick={this.toggleAllActive}
                style={{ backgroundColor: "skyblue", padding: "2px 5px" }}
              >
                Mark All Active
              </button>
            ) : null}
          </div>
          <br></br>
          {this.state.todo.filter((todoItem) => todoItem.complete === true)
            .length ? (
            <button
              style={{
                color: "black",
                backgroundColor: "red",
                padding: "3px 10px",
              }}
              onClick={this.deleteAllCompleted}
            >
              <b>Delete All Completed Todo's</b>
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default TodoPage;
