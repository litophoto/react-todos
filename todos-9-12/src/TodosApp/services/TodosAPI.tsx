import { useState, useEffect } from "react";
import { Todo } from "../models/Todo";

const url = "http://127.0.0.1:8000/api/v1/todos/";
const headers = { "Content-Type": "application/json" };
export const useTodosAPI = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(url);
      const data = await response.json();
      setTodos(data);
    })();
  }, []);
  const postTodo = (todo: Todo) => {
    (async () => {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      setTodos([data, ...todos]);
    })();
  };
  const putTodo = (todoId: number, newTodo: Todo) => {
    (async () => {
      const response = await fetch(`${url}${todoId}/`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(newTodo),
      });
      const data = await response.json();
      const newTodos = todos.map((todo) => {
        if (todo.id === data.id) return data;
        return todo;
      });
      setTodos(newTodos);
    })();
  };
  const deleteTodo = (todoId: number) => {
    (async () => {
      const response = await fetch(`${url}${todoId}/`, {
        method: "DELETE",
        headers: headers,
      });
      const newTodos = await todos.filter((todo) => {
        if (todo.id === todoId) return false;
        return true;
      });
      await setTodos(newTodos);
    })();
  };
  const actions = {
    add: postTodo,
    edit: putTodo,
    delete: deleteTodo,
  };
  return [todos, actions] as const;
};
