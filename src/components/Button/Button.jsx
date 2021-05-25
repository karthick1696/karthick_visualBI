import styles from './Button.scss';

export function Button({
    name,
    color,
    type = "button",
    disabled,
    onClick = () => { }
}) {
    return (
        <button
            className={styles[color]}
            disabled={disabled}
            type={type}
            onClick={onClick}>
            {name}
        </button>
    )
}
