import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodo, setIncompleteTodo] = useState([]);
  const [completeTodo, setCompleteTodo] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onClickAdd = () => {
    if (todoText === "") {
      return;
    }
    const newTodos = [...incompleteTodo, todoText];
    setIncompleteTodo(newTodos);
    setTodoText("");
  };
  const onClickComplete = (index) => {
    const newIncompleteTodo = [...incompleteTodo];
    newIncompleteTodo.splice(index, 1);

    const newCompleteTodo = [...completeTodo, incompleteTodo[index]];

    setIncompleteTodo(newIncompleteTodo);
    setCompleteTodo(newCompleteTodo);
  };
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodo];
    newTodos.splice(index, 1);
    setIncompleteTodo(newTodos);
  };
  const onClickBack = (index) => {
    const newCompleteTodo = [...completeTodo];
    newCompleteTodo.splice(index, 1);

    const newIncompleteTodo = [...incompleteTodo, completeTodo[index]];

    setIncompleteTodo(newIncompleteTodo);
    setCompleteTodo(newCompleteTodo);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodo.length >= 5}
      />
      {incompleteTodo.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるtodoは５個までです。消化してください。
        </p>
      )}
      <IncompleteTodos
        todos={incompleteTodo}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodo} onClickBack={onClickBack} />
    </>
  );
};
