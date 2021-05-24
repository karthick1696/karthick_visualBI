import styles from './Input.scss';

export function Input({
    type,
    label,
    inputProps,
    selectProps,
    children,
    classes
}) {
    const getInput = () => {
        const { options } = selectProps.option || {};

        switch (type) {
            case 'select':
                return (
                    <select
                        className={classes.input}
                        {...selectProps.select}>
                        {(options || []).map((option, i) => {
                            return (
                                <option
                                    value={option.value}
                                    key={option.id}
                                    {...selectProps.option}>
                                    {option.label}
                                </option>
                            )
                        })}
                    </select>
                );
            default:
                return (
                    <input
                        className={classes.input}
                        {...inputProps} />
                );
        }
    }

    return (
        <div className={`${styles.container} ${classes.container}`}>
            <label className={classes.label}>
                {label}
            </label>
            <div className={classes.inputContainer}>
                {getInput()}
                {children}
            </div>
        </div>
    );
}

Input.defaultProps = {
    type: '',
    classes: {
        container: '',
        label: '',
        inputContainer: '',
        input: '',
    },
    label: '',
    inputProps: {
        className: '',
        type: '',
        placeholder: '',
        onChange: () => { },
        defaultValue: '',
        value: ''
    },
    selectProps: {
        select: {
            className: '',
            placeholder: '',
            onChange: () => { },
            defaultValue: '',
            value: ''
        },
        option: {
            className: '',
            options: [],
        },
    },
    children: null
}
