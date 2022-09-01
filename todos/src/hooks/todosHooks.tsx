import { useState, useEffect } from "react";
import { Todo } from "../models/Todo";

const url = "http://127.0.0.1:8000/api/v1/todos/";
export const getTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(url);
      const json = await response.json();
      setTodos(json);
    })();
  }, []);
  return todos;
};

export const postTodo = (newTodo: Todo) => {
  const [todo, setTodo] = useState<Todo>();
  (async () => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(newTodo),
      });
      const json = await response.json();
      setTodo(json);
    })();
  return todo;
};

export const putTodo = (todo: Todo) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(`${url}${todo.id}/`, {
        method: "PUT",
        body: JSON.stringify(todo),
      });
      const json = await response.json();
      setTodos(json);
    })();
  }, []);
  return todos;
};

export const deleteTodo = (todo: Todo) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    async () => {
      const response = await fetch(`${url}${todo.id}/`, {
        method: "DELETE",
        body: JSON.stringify(todo),
      });
    };
  }, []);
  return todos;
};
