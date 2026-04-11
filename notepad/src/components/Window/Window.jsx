import './Window.less'
import Card from '../Card/Card.jsx'

function Window({tasks, title, backgroundColor, onEdit, onDelete, /*change_st*/}) {
    return (
        <>
        <div className='wind' style={{backgroundColor}}>
            <h1>{title}</h1>
            {tasks.map((task) => (<Card key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} /*change_st={change_st}*//>))}
        </div>
        </>
    )
}

export default Window