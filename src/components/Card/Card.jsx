import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';

import { formatDate } from './../../common/utils';

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
            type: playlistType,
            onSelectIcon = () => { },
            classes: playlistClasses = {}
        } = {
            type: '',
            onSelectIcon: () => { },
            classes: {}
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
                        <div className={styles.title}>
                            <div title={detail.title}>
                                {detail.title}
                            </div>
                            <div title={albums[detail.albumId]}>
                                <strong>Album:</strong> {albums[detail.albumId]}
                            </div>
                        </div>
                        {children}
                    </>
                );

            case "playlist":
                const date = formatDate(
                    detail.updatedOn ||detail.createdOn
                );

                return (
                    <>
                        <div className={styles.title}>
                            <div title={detail.title}>
                                {detail.title}
                            </div>
                            <div title={date}>
                                <strong>
                                    {detail.updatedOn ? 'Updated on' : 'Created on:'}
                                </strong> {date}
                            </div>
                        </div>
                        {children}
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

    const getIcons = () => {
        switch (playlistType) {
            case 'add':
                return (
                    <AddCircleOutlineIcon
                        titleAccess="Add"
                        onClick={() => onSelectIcon(detail)} />
                );
            case 'edit':
                return (
                    <DeleteIcon
                        titleAccess="Delete"
                        onClick={() => onSelectIcon(detail)} />
                );
            default:
                return null;
        }
    }


    return (
        <div className={`
            ${styles.card}
            ${!type ? classes.card : playlistClasses.card}
        `}>
            <div className={`${styles.cardDetails} ${classes.detail}`}>
                {getDetailView()}
            </div>
            {getIcons()}
        </div>
    )
}
