import { useEffect, useState } from "react";

import { getItem } from "../../../common/utils";

import styles from "./Playlists.scss";

export function Playlists({
    actions
}) {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const albumList = getItem('albumList');
        if (albumList) {
            setAlbums(albumList);

            return;
        }
        actions.getAllAlbums({
            callback: setAlbums
        })
    }, []);

    return (
        <div className={styles.container}>
            {albums.map(album => <div>{album.id}</div>)}
        </div>
    );
}
