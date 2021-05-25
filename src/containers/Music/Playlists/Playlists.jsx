import { useEffect, useState } from "react";
import EditIcon from '@material-ui/icons/Edit';

import { getItem } from "../../../common/utils";
import Card from "../../../components/Card";

import Button from "../../../components/Button";
import styles from "./Playlists.scss";
import CreatePlaylist from "./CreatePlaylist";

export function Playlists(props) {
    const [playlists, setPlaylists] = useState([]);
    const [isCreate, setCreate] = useState(false);

    useEffect(() => {
        setPlaylists(
            getItem('playList') || []
        );
    }, []);

    if (isCreate) {
        return (
            <CreatePlaylist
                playlists={playlists}
                {...props} />
        )
    }

    return (
        <>
            <div className={styles.container}>
                {playlists.map(playlist => (
                    <Card
                        key={playlist.id}
                        classes={{
                            detail: styles.cardDetail
                        }}
                        detail={playlist}>
                        <EditIcon className={styles.edit} />
                    </Card>
                ))}
                {!playlists.length
                    ? (
                        <div className={styles.noData}>
                            No Playlist Found, Create One
                        </div>
                    ) : null}
            </div>
            <div className={styles.btnWrap}>
                <Button
                    onClick={() => setCreate(true)}
                    name="Create Playlist" />
            </div>
        </>
    );
}
