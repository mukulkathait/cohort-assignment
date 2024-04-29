import React, { useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([
    {
      title: "Go to gym",
      description: "Go to gym btw 7-9pm",
      completed: false,
    },
    {
      title: "Study DSA",
      description: "Study DSA btw 7-9am",
      completed: false,
    },
  ]);

  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");

  const addTodo = () => {
    setTodos([
      ...todos,
      {
        title: newTodoTitle,
        description: newTodoDescription,
        completed: false,
      },
    ]);
    //Clear input fields after adding todo
    setNewTodoTitle("");
    setNewTodoDescription("");
  };

  return (
    <div>
      <AddTodo
        newTodoTitle={newTodoTitle}
        newTodoDescription={newTodoDescription}
        setNewTodoTitle={setNewTodoTitle}
        setNewTodoDescription={setNewTodoDescription}
        addTodo={addTodo}
      />

      {todos.map((todo, index) => {
        return (
          <Todos
            key={index}
            title={todo.title}
            description={todo.description}
          ></Todos>
        );
      })}
    </div>
  );
}

function AddTodo({
  newTodoTitle,
  newTodoDescription,
  setNewTodoTitle,
  setNewTodoDescription,
  addTodo,
}) {
  return (
    <>
      <input
        type="text"
        placeholder="todo title"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />{" "}
      <br />
      <input
        type="text"
        placeholder="todo description"
        value={newTodoDescription}
        onChange={(e) => setNewTodoDescription(e.target.value)}
      />{" "}
      <br />
      <button onClick={addTodo}>Add Todo</button>
    </>
  );
}

function Todos(props) {
  return (
    <>
      <h3>
        <b>{props.title}</b>
      </h3>
      <h3>{props.description}</h3>
      <div>{props.completed}</div>
    </>
  );
}

export default TodoApp;
