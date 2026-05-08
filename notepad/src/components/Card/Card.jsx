import './Card.less'
import Button from '../Button/Button.jsx'

function Card({task, onEdit, onDelete, change_st}) {

    let isLate = new Date(task.date) < new Date() && task.state !== 'Выполненная'

    return (
        <>
        <div className='card' style={{backgroundColor: isLate ? 'red' : 'white', color: isLate ? 'white' : 'black'}}>
            <header> 
                <h1>{task.title}</h1>
                <button onClick={() => {onDelete(task)}} className='delete'>x</button>
            </header>

            <p>{task.desc}</p> 

            <div>
                <p>Дедлайн: <span>{task.date}</span></p>
            </div>

            <div>
                <Button onClick={() => (change_st(task.id, task.state === 'Выполненная' ? 'В работе' : 'Поставленная'))} className='arrow' txt={'<'}/>
                <Button onClick={() => (onEdit(task))} className='arrow' txt={'Редактировать'}/>
                <Button onClick={() => (change_st(task.id, task.state === 'Поставленная' ? 'В работе' : 'Выполненная'))} className='arrow' txt={'>'}/>
            </div>
        </div>
        </>
    )
}

export default Card