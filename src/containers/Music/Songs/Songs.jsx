/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { debounce, differenceWith, isEmpty } from "lodash";

import { getItem } from "../../../common/utils";
import { SONGS, STORAGE } from "../../../common/constants";
import Card from "../../../components/Card";
import Search from "../../../components/Search";

import styles from "./Songs.scss";

export function Songs(props) {
    const {
        actions,
        songs,
        classes = {},
        albums,
        playlist,
        playlistConfig = {
            type: '',
            onSelectIcon: () => { },
            classes: {}
        },
        loading
    } = props;

    useEffect(() => {
        const songList = getAppropriateSongList();

        isEmpty(albums) && actions.getAllAlbums();
        if (songList) {
            actions.setSongs(songList);

            return;
        }
        actions.getAllSongs();

        return () => {
            actions.setSongs([]);
        }
    }, []);

    const getAppropriateSongList = () => {
        const songList = getItem(STORAGE.SONG_LIST);

        if (playlistConfig.type) {
            return differenceWith(
                songList || [],
                playlist.songs,
                (a, b) => a.id === b.id
            );
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
                    placeholder: SONGS.SEARCH_PLACEHOLDER,
                    onChange: onSearch
                }} />
            <div className={`${styles.container} ${classes.container}`}>
                {songs.map(song => (
                    <Card
                        key={song.id}
                        type="song"
                        detail={song}
                        albums={albums}
                        playlistConfig={playlistConfig} />
                ))}
                {(!songs.length && !loading)
                    ? (
                        <div className={styles.noDataWrap}>
                            No Songs Found!!
                        </div>
                    ) : null}
            </div>
        </>
    );
}
