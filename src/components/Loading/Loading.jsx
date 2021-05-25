import { useEffect, useState } from 'react';
import styles from "./Loading.scss";

export function Loading() {
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        const timer = setTimeout(
            () => setShowLoader(true), 500
        );

        return () => clearTimeout(timer);
    }, []);

    if (!showLoader) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.loader} />
        </div>
    );
}
