import './Button.less'

function Button({onClick, name_class, txt}) {
    return(
        <>
        <button onClick={onClick} className={`card_btn ${name_class}`}>{txt}</button>
        </>
    )
}

export default Button