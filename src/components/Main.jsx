/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import './Main.css'

export default function Main() {
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('')
  const [tasks, setTasks] = useState([])
  const [index, setIndex] = useState(-1)

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    if (!tasks) {
      return
    }
    setTasks(tasks)
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function handleChangeInput(e) {
    const inputValue = e.target.value
    setNewTask(inputValue)
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newTaskFormated = newTask.trim()

    if (newTaskFormated.length === 0 || tasks.indexOf(newTask) !== -1) {
      console.log('Ja exise ou ta vazia')
      setNewTask('')
      return
    }

    const newTasks = [...tasks] // imutabilidade
    const newTasksArray = [...newTasks, newTaskFormated] // copia do array

    if (index === -1) {
      setTasks(newTasksArray)
      setNewTask('')
    } else {
      newTasks[index] = newTaskFormated
      setTasks([...newTasks])
      setNewTask('')
      setIndex(-1)
    }
  }

  function handleDelete(e, index) {
    const newTasks = [...tasks]
    newTasks.splice(index, 1)
    setTasks([...newTasks])
  }

  function handleEdit(e, index) {
    setIndex(index)
    setNewTask(tasks[index])
  }

  function handleFilter(e) {
    const inputValue = e.target.value
    setFilter(inputValue)
  }

  const filterTasks = tasks.filter((tasks) =>
    tasks.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div className="main">
      <h1>To-do List</h1>

      <div className="teste">
        <input
          type="text"
          placeholder="Filtrar To Do"
          onChange={handleFilter}
        />
      </div>

      {
        <ul className="tasks">
          {filterTasks.map((task, index) => (
            <li key={task}>
              {task}
              <span>
                <FaEdit
                  className="edit"
                  onClick={(e) => handleEdit(e, index)}
                />
                <FaTrash
                  className="trash"
                  onClick={(e) => handleDelete(e, index)}
                />
              </span>
            </li>
          ))}
        </ul>
      }

      <form action="#" className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={handleChangeInput}
          placeholder="Adiconar To Do"
        />
        <button type="submit">
          <FaPlus />
        </button>
      </form>
    </div>
  )
}
