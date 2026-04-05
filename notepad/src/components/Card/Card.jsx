import './Card.less'
import Button from '../Button/Button.jsx'

function Card({task, onEdit/*onDelete, change_st*/}) {
    return (
        <>
        <header> 
            <h1>{task.title}</h1>
            <button /*onClick={onDelete}*/ className='delete'>x</button>
        </header>

        <p>{task.desc}</p> 

        <div>
            <p>Дедлайн: <span>{task.date}</span></p>
        </div>

        <div>
            <Button /*onClick={change_st}*/ className='arrow' txt={'<'}/>
            <Button onClick={() => (onEdit(task))} className='arrow' txt={'Редактировать'}/>
            <Button /*onClick={change_st}*/ className='arrow' txt={'>'}/>
        </div>
        </>
    )
}

export default Card