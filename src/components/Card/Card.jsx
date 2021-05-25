import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import styles from "./Card.scss";

export function Card({
    type = "",
    children,
    ...rest
}) {
    const {
        detail = {},
        classes = {},
        albums,
        playlistConfig: {
            forPlaylist,
            onSelectAdd,
            classes: playlistClasses
        }
    } = rest;

    const getDetailView = () => {
        switch (type) {
            case "song":
                return (
                    <>
                        <img
                            className={styles.thumbnail}
                            src={detail.thumbnailUrl}
                            alt="thumbnail" />
                        <div
                            title={detail.title}
                            className={styles.title}>
                            <div>{detail.title}</div>
                            <div>
                                <strong>Album:</strong> {albums[detail.albumId]}
                            </div>
                        </div>
                    </>
                );

            default:
                return (
                    <>
                        <div
                            title={detail.title}
                            className={styles.title}>
                            {detail.title}
                        </div>
                        {children}
                    </>
                );
        }
    }


    return (
        <div className={`
            ${styles.card}
            ${!forPlaylist ? classes.card : playlistClasses.card}
        `}>
            <div className={`${styles.cardDetails} ${classes.detail}`}>
                {getDetailView()}
            </div>
            {forPlaylist ? (
                <AddCircleOutlineIcon
                    onClick={() => onSelectAdd(detail)} />
             ) : null}
        </div>
    )
}
