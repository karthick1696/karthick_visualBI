import { useEffect, useState } from "react";
import EditIcon from '@material-ui/icons/Edit';

import CreatePlaylist from "./CreatePlaylist";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import { getItem } from "../../../common/utils";
import { STORAGE, PLAYLIST } from "../../../common/constants";

import styles from "./Playlists.scss";

export function Playlists(props) {
    const [playlists, setPlaylists] = useState([]);
    const [isCreate, setCreate] = useState(false);
    const [selectedPlayList, setSelectedPlayList] = useState(null);

    useEffect(() => {
        setPlaylists(
            getItem(STORAGE.PLAY_LIST) || []
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
                        type={PLAYLIST.TYPE}
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
                    name={PLAYLIST.CREATE_PLAYLIST} />
            </div>
        </>
    );
}
