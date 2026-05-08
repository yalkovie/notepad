import './ModalDelete.less'

function ModalDelete({isOpen, onClose, onConfirm, taskTitle}) {

    if (!isOpen) {return null}

    return (
        <>
        <div id='modal_del'>
            <h2>Вы уверены, что хотите удалить задачу "{taskTitle}"?</h2>
            <div className='modal_btn'>
                <button onClick={onConfirm}>Удалить</button>
                <button onClick={onClose}>Отмена</button>
            </div>
        </div>
        </>
    )
}

export default ModalDelete