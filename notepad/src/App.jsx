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

  let [startDate, setStartDate] = useState('')
  let [endDate, setEndDate] = useState('')

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

  function onDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id))
    setDeleteIsOpen(false)
    console.log(tasks);
  }

  function confirmDelete(task) {
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

  function change_st(id, taskState) {
    setTasks(tasks.map((el) => (el.id === id ? {...el, state : taskState} : el)))
  }

  function filterTask(tasks) {
    if (startDate && endDate) {
      let firstDate = new Date(startDate)
      let secondDate = new Date(endDate)
      return tasks.filter(el => {
        let task_date = new Date(el.date)
      return  task_date >= firstDate && task_date <= secondDate})
    }
    return tasks
  }

  function pars_date(date) {
    if (!date) {
      return ''
    }
    let [y, m ,d] = date.split('-')
    if (y[0] != 0) {
      return true
    }
    return false
  }

  function start_handle_change (el) {
    console.log(el);
    let value = el.target.value
    console.log(value);
    console.log(value[0]);
    if (value === '' || value.length === 10) {
      if (pars_date(value)) {
        setStartDate(value)
      }
    }
  }

  function end_handle_change (el) {
    let value = el.target.value
    setEndDate(value)
    
  }

  return (
    <>
      <div id='app'>
        <header>
          <button className='header_btn' onClick={newTask}>НОВАЯ ЗАДАЧА</button>
          <div className='filter'>
            <span>Фильтр по дедлайнам с:</span>
            <input type="date" name="firstDat" id="firstDat" value={startDate || ''} onChange={start_handle_change}/>
            <span>по:</span>
            <input type="date" name="secondDat" id="secondDat" value={endDate || ''} onChange={end_handle_change}/>
            <button  className='header_btn'>СБРОСИТЬ ФИЛЬТРЫ</button>
          </div>
        </header>
        <div id='window'>
          <Window className='wind' title={'ПОСТАВЛЕННЫЕ'} backgroundColor={'#ff99ff'} onEdit={onEdit} tasks={filterTask(tasks).filter((task) => task.state === 'Поставленная')} onDelete={(deleteTask) => {confirmDelete(deleteTask)}} change_st={change_st}/>
          <Window className='wind' title={'В РАБОТЕ'} backgroundColor={'#99ffff'} onEdit={onEdit} tasks={filterTask(tasks).filter((task) => task.state === 'В работе')} onDelete={(deleteTask) => {confirmDelete(deleteTask)}} change_st={change_st}/>
          <Window className='wind' title={'ВЫПОЛНЕННЫЕ'} backgroundColor={'#99ff99'} onEdit={onEdit} tasks={filterTask(tasks).filter((task) => task.state === 'Выполненная')} onDelete={(deleteTask) => {confirmDelete(deleteTask)}} change_st={change_st}/>
        </div>
      </div>

      <ModalNew task={modalTask} isOpen={isOpen} onClose={onClose} onSave={onSave}/>
      <ModalDelete isOpen={deleteIsOpen} onClose={() => {setDeleteIsOpen(false)}} onConfirm={() => {onDelete(deleteTask?.id)}} taskTitle={deleteTask?.title}/>
    </>
  )
}

export default App
