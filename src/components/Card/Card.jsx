import styles from "./Card.scss";

export function Card({
    type = "",
    ...rest
}) {
    switch (type) {
        case "song":
            const { song = {} } = rest;

            return (
                <div className={styles.song}>
                    <div className={styles.songDetails}>
                        <img
                            className={styles.thumbnail}
                            src={song.thumbnailUrl}
                            alt="thumbnail" />
                        <div
                            title={song.title}
                            className={styles.title}>
                            {song.title}
                        </div>
                    </div>
                </div>
            );

        default:
            return null;
    }
}
