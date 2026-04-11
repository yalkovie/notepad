import { useState, useRef, useEffect } from 'react'
import './App.css'
import Window from './components/Window/Window.jsx'
import ModalNew from './components/ModalNew/ModalNew.jsx'
import ModalDelete from './components/ModalDelete/ModalDelete.jsx'

function App() {

  let [tasks, setTasks] = useState(() => {
    let timeTasks = localStorage.getItem('localTasks')
    return timeTasks ? JSON.parse(timeTasks) : []
  })

  let [modalTask, setModalTask] = useState(null)
  let [deleteTask, setDeleteTask] = useState(null)

  useEffect(() => {
    localStorage.setItem('localTasks', JSON.stringify(tasks))
  }, [tasks])

  let [isOpen, setIsOpen] = useState(false)
  let [deleteIsOpen, setDeleteIsOpen] = useState(false)

  function onClose() {
    setIsOpen(false)
  }

  function onSave(task) {
    onClose()
    if (task.id) {
      setTasks(tasks.map((el) => (el.id === task.id ? task : el)))
    } else {
      setTasks([...tasks, {...task, id : Date.now(), state : 'Поставленная'}])
    }
    return tasks;
  }

  function onDelete (id) {
    setTasks(tasks.filter((task) => task.id !== id))
    setDeleteIsOpen(false)
    console.log(tasks);
  }

  function confirmDelete (task) {
    setDeleteTask(task)
    setDeleteIsOpen(true)
  }

  function newTask() {
    setIsOpen(true)
  }

  function onEdit(task) {
    setModalTask(task)
    setIsOpen(true)
  }

  return (
    <>
      <div id='app'>
        <header>
          <button className='header_btn' onClick={newTask}>НОВАЯ ЗАДАЧА</button>
          <div className='filter'>
            <span>Фильтр по дедлайнам с:</span>
            <input type="date" name="firstDat" id="firstDat" />
            <span>по:</span>
            <input type="date" name="secondDat" id="secondDat" />
            <button  className='header_btn'>СБРОСИТЬ ФИЛЬТРЫ</button>
          </div>
        </header>

        <Window title={'ПОСТАВЛЕННЫЕ'} backgroundColor={'#ff99ff'} onEdit={onEdit} tasks={tasks.filter((task) => task.state === 'Поставленная')} onDelete={() => {confirmDelete(deleteTask)}} /*change_st={None}*//>
        <Window title={'В РАБОТЕ'} backgroundColor={'#99ffff'} onEdit={onEdit} tasks={tasks.filter((task) => task.state === 'В работе')} onDelete={() => {confirmDelete(deleteTask)}} /*change_st={None}*//>
        <Window title={'ВЫПОЛНЕННЫЕ'} backgroundColor={'#99ff99'} onEdit={onEdit} tasks={tasks.filter((task) => task.state === 'Выполненная')} onDelete={() => {confirmDelete(deleteTask)}} /* change_st={None}*//>
      </div>

      <ModalNew task={modalTask} isOpen={isOpen} onClose={onClose} onSave={onSave}/>
      <ModalDelete isOpen={deleteIsOpen} onClose={() => {setDeleteIsOpen(false)}} onConfirm={() => {onDelete(deleteTask?.id)}} taskTitle={deleteTask?.title}/>
    </>
  )
}

export default App
