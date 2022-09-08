import { useEffect, useState } from "react";
import { Todo } from "../models/Todo.ts/Todo";

const url = "http://127.0.0.1:8000/api/v1/todos/"
const myHeaders = {
  "Content-Type": "application/json"
}
export const useTodoService = () => {
  // Get todos data
  const [todos, setTodos] = useState<Todo[]>([])
  useEffect(() => {
    (async () => {
      const response = await fetch(url)
      const data = await response.json()
      await setTodos(data)
    })()
  }, [])

  // Add new todo
  const addTodo = (newTodo: Todo) => {
    (async () => {
      const response = await fetch(url, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(newTodo)
      })
      const data = await response.json()
      await setTodos([data, ...todos])
    })()
  }

  // Edit todo
  const editTodo = (todoId: number, newTodo: Todo) => {
    (async () => {
      const response = await fetch(url + todoId + '/', {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(newTodo),
      })
      const data = await response.json()
      const newTodos = await todos.map(todo => {
        if (todo.id === todoId) return data
        return todo
      })
      setTodos(newTodos)
    })()
  }

  // Delete todo
  const deleteTodo = (todoId: number) => {
    (async () => {
      const response = await fetch(url + todoId + '/', {
        method: "DELETE",
        headers: myHeaders,
      })
      const newTodos = await todos.filter(todo => {
        if (todo.id === todoId) return false
        return true
      })
      setTodos(newTodos)
    })()
  }
  return { todos, addTodo, editTodo, deleteTodo }
}