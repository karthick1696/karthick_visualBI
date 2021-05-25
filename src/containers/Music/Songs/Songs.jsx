import { useEffect } from "react";
import { debounce, differenceWith, isEqual } from "lodash";

import { getItem } from "../../../common/utils";
import Card from "../../../components/Card";
import Search from "../../../components/Search";

import styles from "./Songs.scss";

export function Songs(props) {
    const {
        actions,
        songs,
        albums,
        playlist,
        playlistConfig = {
            forPlaylist: false,
            onSelectAdd: () => { },
            classes: {}
        }
    } = props;

    useEffect(() => {
        const songList = getAppropriateSongList();

        actions.getAllAlbums();
        if (songList) {
            actions.setSongs(songList);

            return;
        }
        actions.getAlbumsWithSongs();

        return () => {
            actions.setSongs([]);
        }
    }, []);

    const getAppropriateSongList = () => {
        const songList = getItem("songList");

        if (playlistConfig.forPlaylist) {
            return differenceWith(songList || [], playlist.songs, isEqual);
        }

        return songList;
    }

    const onSearch = debounce(e => {
        const value = e.target.value;
        const songList = getAppropriateSongList();

        if (!value) {
            actions.setSongs(songList);

            return;
        }

        actions.setSongs(
            songList.filter(song => song.title.indexOf(value) !== -1)
        );
    }, 200);

    return (
        <>
            <Search
                inputProps={{
                    placeholder: "Search for songs...",
                    onChange: onSearch
                }} />
            <div className={styles.container}>
                {songs.map(song => (
                    <Card
                        key={song.id}
                        type="song"
                        detail={song}
                        albums={albums}
                        playlistConfig={playlistConfig} />
                ))}
            </div>
        </>
    );
}
