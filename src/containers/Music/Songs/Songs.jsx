import { useEffect, useState } from "react";
import debounce from "lodash/debounce";

import { getItem } from "../../../common/utils";
import Card from "../../../components/Card";
import Search from "../../../components/Search";

import styles from "./Songs.scss";

export function Songs({
    actions
}) {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const songList = getItem('songList');
        if (songList) {
            setSongs(songList);

            return;
        }
        actions.getAllSongs({
            callback: setSongs
        })
    }, []);

    const onSearch = debounce(e => {
        const value = e.target.value;
        const songList = getItem("songList") || [];

        if (!value) {
            setSongs(songList);

            return;
        }

        setSongs(
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
                        type="song"
                        song={song} />
                ))}
            </div>
        </>
    );
}
