import React, { useState, useEffect } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import TodoPage from "./components/TodoPage";
import firebase from "firebase";
import { fire, db } from "./firebase_config";

function App() {
  const [hasAccount, setHasAccount] = useState(true);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  function clearErrors() {
    setEmailError("");
    setPasswordError("");
  }

  function clearInputs() {
    setEmail("");
    setPassword("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    clearErrors();

    if (hasAccount) {
      fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
            case "auth/user-disaled":
            case "auth/user-not-found":
              setEmailError(error.message);
              break;
            case "auth/wrong-password":
              setPasswordError(error.message);
              break;
            default:
              console.log("Default Error :" + error.message);
          }
        });
    } else {
      fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
            case "auth/invalid-email":
              setEmailError(error.message);
              break;
            case "auth/invalid-password":
            case "auth/weak-password":
              setPasswordError(error.message);
              break;
            default:
              console.log("Default Error :" + error.message);
          }
        });
    }
  }

  function handleTodoAdd(event) {
    event.preventDefault();
    db.collection(user.uid)
      .add({
        text: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        complete: false,
      })
      .then(function () {
        console.log("Todo successfully added!");
      })
      .catch(function (error) {
        console.error("Error adding Todo: ", error);
      });
    setText("");
  }

  function logout() {
    fire.auth().signOut();
  }

  function getTodos() {
    db.collection(user.uid)
      .orderBy("timestamp", "desc")
      .onSnapshot(function (query) {
        setTodos(
          query.docs.map((doc) => ({
            id: doc.id,
            text: doc.data().text,
            complete: doc.data().complete,
          }))
        );
      });
  }

  function toggleStatusPending(id) {
    db.collection(user.uid)
      .doc(id)
      .update({ complete: false })
      .then(function () {
        console.log("Todo successfully updated!");
      })
      .catch(function (error) {
        console.error("Error updating Todo: ", error);
      });
  }

  function toggleStatusCompleted(id) {
    db.collection(user.uid)
      .doc(id)
      .update({ complete: true })
      .then(function () {
        console.log("Todo successfully updated!");
      })
      .catch(function (error) {
        console.error("Error updating Todo: ", error);
      });
  }

  function deleteTodo(id) {
    db.collection(user.uid)
      .doc(id)
      .delete()
      .then(function () {
        console.log("Todo successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error deleting Todo: ", error);
      });
  }

  useEffect(() => {
    function authListener() {
      fire.auth().onAuthStateChanged((user) => {
        if (user) {
          clearInputs();
          setUser(user);
        } else {
          setUser("");
        }
      });
    }
    authListener();
  }, []);

  return (
    <div className="App">
      {user ? (
        <TodoPage
          user={user}
          logout={logout}
          text={text}
          setText={setText}
          todos={todos}
          setTodos={setTodos}
          getTodos={getTodos}
          handleTodoAdd={handleTodoAdd}
          toggleStatusPending={toggleStatusPending}
          toggleStatusCompleted={toggleStatusCompleted}
          deleteTodo={deleteTodo}
        />
      ) : (
        <SignUp
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          user={user}
          setUser={setUser}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          emailError={emailError}
          setEmailError={setEmailError}
          passwordError={passwordError}
          setPasswordError={setPasswordError}
          handleSubmit={handleSubmit}
          clearErrors={clearErrors}
          clearInputs={clearInputs}
        />
      )}
    </div>
  );
}

export default App;
