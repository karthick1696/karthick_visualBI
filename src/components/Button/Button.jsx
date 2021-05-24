import styles from './Button.scss';

export function Button({
    type,
    children,
    classes,
    color,
    onClick,
    disabled,
    name
}) {
    return (
        <div className={classes.container}>
            <button
                className={`${classes.button} ${styles[color]}`}
                disabled={disabled}
                type={type}
                onClick={onClick}>
                {name}
            </button>
            {children}
        </div>
    );
}

Button.defaultProps = {
    type: 'button',
    disabled: false,
    children: null,
    classes: {
        button: '',
        container: ''
    },
    onClick: () => { },
    name: '',
    color: ''
}
