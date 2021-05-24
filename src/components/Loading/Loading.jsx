import styles from "./Loading.scss";

export function Loading() {
    return (
        <div className={styles.container}>
            <div className={styles.loader} />
        </div>
    );
}
