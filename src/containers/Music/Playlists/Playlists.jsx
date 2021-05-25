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
    const [selectedPlayList, setSelectedPlayList] = useState(null);

    useEffect(() => {
        setPlaylists(
            getItem('playList') || []
        );
    }, []);

    const onEditPlayList = playlist => setSelectedPlayList(playlist);

    if (isCreate || selectedPlayList) {
        return (
            <CreatePlaylist
                playlists={playlists}
                setPlaylists={setPlaylists}
                setCreate={setCreate}
                setSelectedPlayList={setSelectedPlayList}
                selectedPlayList={selectedPlayList}
                {...props} />
        )
    }

    return (
        <>
            <div className={styles.container}>
                {playlists.map(playlist => (
                    <Card
                        key={playlist.id}
                        type="playlist"
                        classes={{
                            detail: styles.cardDetail
                        }}
                        detail={playlist}>
                        <EditIcon
                            onClick={() => onEditPlayList(playlist)}
                            titleAccess="Edit"
                            className={styles.edit} />
                    </Card>
                ))}
                {!playlists.length
                    ? (
                        <div className={styles.noDataWrap}>
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
