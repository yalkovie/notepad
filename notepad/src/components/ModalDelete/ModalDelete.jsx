import './ModalDelete.less'

function ModalDelete({isOpen, onClose, onConfirm, taskTitle}) {

    if (!isOpen) {return null}

    return (
        <>
            <h2>Вы уверены, что хотите удалить задачу "{taskTitle}"?</h2>
            <div>
                <button onClick={onConfirm}>Удалить</button>
                <button onClick={onClose}>Отмена</button>
            </div>
        </>
    )
}

export default ModalDelete