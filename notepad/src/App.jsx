import { useState, useRef, useEffect } from 'react'
import './App.css'
import Window from './components/Window/Window.jsx'
import ModalNew from './components/ModalNew/ModalNew.jsx'

function App() {

  let [tasks, setTasks] = useState(() => {
    let timeTasks = localStorage.getItem('localTasks')
    return timeTasks ? JSON.parse(timeTasks) : []
  })
  useEffect(() => {
    localStorage.setItem('localTasks', JSON.stringify(tasks))
  }, [tasks])

  let [isOpen, setIsOpen] = useState(false)

  function onClose() {
    setIsOpen(false)
  }

  function onSave(task) {
    onClose()
    if (task.id) {
      setTasks(tasks.map((el) => {el.id === task.id ? task : el}))
    } else {
      setTasks([...tasks, {...task, id : Date.now(), state : 'Поставленная'}])
    }

  }

  function newTask() {
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

        <Window title={'ПОСТАВЛЕННЫЕ'} backgroundColor={'#ff99ff'} /*tasks={None} onEdit={None} onDelete={None} change_st={None}*//>
        <Window title={'В РАБОТЕ'} backgroundColor={'#99ffff'} /*tasks={None} onEdit={None} onDelete={None} change_st={None}*//>
        <Window title={'ВЫПОЛНЕННЫЕ'} backgroundColor={'#99ff99'} /*tasks={None} onEdit={None} onDelete={None} change_st={None}*//>
      </div>

      <ModalNew task={null} isOpen={isOpen} onClose={onClose} onSave={onSave}/>
    </>
  )
}

export default App
