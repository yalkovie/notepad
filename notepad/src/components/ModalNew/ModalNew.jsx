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
    }, [task])

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
        <div id='modal_new'>
            <h2>{task ? 'Редактировать задачу' : 'Новая задача'}</h2>
            <form className='card_form' onSubmit={handleSubmit}>
                <input type="text" required placeholder='Заголовок' onChange={el => (setTitle(el.target.value))} value={title}/>
                <textarea required placeholder='Описание' onChange={el => (setDescrip(el.target.value))} value={descrip}></textarea>
                <input type="date"required onChange={el => (setDate(el.target.value))} value={date}/>
                <div className='modal_btn'>
                    <button type='submit'>Сохранить</button>
                    <button onClick={onClose}>Отмена</button>
                </div>
            </form>
        </div>

        </>
    )
}

export default ModalNew