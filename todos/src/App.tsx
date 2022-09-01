import React, { useEffect, useState } from "react";
import { Todo } from "./models/Todo";
import { useFetch } from "./hooks/useFetch";
import { getTodos, postTodo } from "./hooks/todosHooks";
import OnePageTodos from "./OnePageTodos";

function App() {
  // const [todoList, setTodoList] = useState<Todo[]>([
  //   { id: 1, title: "aaa", done: true },
  // ]);
  // const { data: todos } = useFetch<Todo[]>(
  //   "http://127.0.0.1:8000/api/v1/todos/"
  // );
  // useEffect(() => {
  //   console.log(todos);
  //   console.log(todoList);
  // }, []);
  // useEffect(() => {
  //   setTodoList(todos)
  // }, [])
  return (
    <>
      <OnePageTodos></OnePageTodos>
    </>
  );
}

export default App;
