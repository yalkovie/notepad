import { useEffect, useState } from 'react'
import './ModalNew.less'

function ModalNew({task, isOpen, onClose, onSave}) {

    let [title, setTitle] = useState('')
    let [descrip, setDescrip] = useState('')
    let [date, setDate] = useState('')
    useEffect(() => {
        if (task) {
            setTitle(task.title)
            setDescrip(task.descrip)
            setDate(task.date)
        } else {
            setTitle('')
            setDescrip('')
            setDate('')
        }
    })
    const handleSubmit = (el) => {
        el.preventDefault();
        onSave({
            ...task, title, descrip, date
        })
        onClose()
    }

    if (!isOpen) {
        return null
    }

    return(
        <>
        <h2>{task ? 'Редактировать задачу' : 'Новая задача'}</h2>
        <h2>Заголовок</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" required placeholder='Заголовок' onChange={el => (setTitle(el.target.value))}/>
            <textarea required placeholder='Описание' onChange={el => (setDescrip(el.target.value))}></textarea>
            <input type="date"required onChange={el => (setDate(el.target.value))}/>
        </form>
        <div>
            <button onClick={onSave}>Сохранить</button>
            <button onClick={onClose}>Отмена</button>
        </div>
        </>
    )
}

export default ModalNew