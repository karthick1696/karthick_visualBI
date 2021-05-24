import styles from "./Search.scss";

export function Search({
    inputProps = {},
}) {
    return (
        <div className={styles.search}>
            <input
                {...inputProps} />
        </div>
    )
}
