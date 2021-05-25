import { useRef, useState, useEffect } from 'react';
import { shuffle } from 'lodash';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import Button from '../../../../components/Button';
import Songs from '../../Songs';
import styles from "./CreatePlaylist.scss";

export function CreatePlaylist({
    playlists,
    songs,
    playlist,
    actions
}) {
    const inputRef = useRef(null);
    const [editName, setEditName] = useState(false);
    const [addSong, setAddSong] = useState(false);

    useEffect(() => {
        actions.setPlaylist({
            name: `Play List ${playlists.length + 1}`,
            songs: []
        })
    }, []);

    const onEditName = e => {
        const value = e.target.value || `Play List ${playlists.length + 1}`;
        actions.setPlaylist({
            ...playlist,
            name: value
        })
        inputRef.current.value = value;
        setEditName(false);
    }

    const addSongToPlaylist = playlistSong => {
        const { songs: playlistSongs } = playlist;
        actions.setPlaylist({
            ...playlist,
            songs: [
                playlistSong,
                ...playlistSongs
            ]
        });
        actions.setSongs(
            songs.filter(song => song.id !== playlistSong.id)
        )
    }

    const onShuffleSongs = () => {
        actions.setPlaylist({
            ...playlist,
            songs: shuffle(playlist.songs)
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleBoxWrap}>
                <div className={styles.titleBox}>
                    <EditIcon
                        titleAccess="Edit"
                        className={!editName ? styles.show : ''}
                        onClick={setEditName.bind(this, true)} />
                    <input
                        ref={inputRef}
                        onBlur={onEditName}
                        disabled={!editName}
                        defaultValue={playlist.name} />
                </div>
                {
                    addSong ? (
                        <KeyboardBackspaceIcon
                            onClick={setAddSong.bind(this, false)}
                            titleAccess="Go Back"
                            className={styles.goBack} />
                    ) : null
                }
            </div>
            {
                addSong ? (
                    <Songs
                        type="song"
                        playlistConfig={{
                            forPlaylist: true,
                            onSelectAdd: addSongToPlaylist,
                            classes: {
                                card: styles.card
                            }
                        }} />
                ) : (

                    <div className={styles.btnWrap}>
                        <Button
                            disabled={!playlist.songs.length}
                            onClick={onShuffleSongs}
                            color="secondary"
                            name="Shuffle Play" />
                        <Button
                            color="secondary"
                            name="Add Song"
                            onClick={setAddSong.bind(this, true)} />
                    </div>
                )
            }
        </div>
    );
}
