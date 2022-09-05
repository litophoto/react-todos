import { useState } from "react"
import { TodoModal } from "./TodoModal"

export const TodoList = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  return (
    <>
    <button onClick={() => setIsOpenModal(true)}>Open</button>
    <TodoModal open={isOpenModal} onClose={() => setIsOpenModal(false)} defaultText="defaultText" label="label" onSubmit={() => console.log('submit')}></TodoModal>
    </>
  )
}