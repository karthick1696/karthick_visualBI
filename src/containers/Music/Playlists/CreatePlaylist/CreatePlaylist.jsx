import { useRef, useState, useEffect } from 'react';
import { shuffle } from 'lodash';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import Button from '../../../../components/Button';
import Songs from '../../Songs';
import styles from "./CreatePlaylist.scss";
import Card from '../../../../components/Card';
import { setItem } from '../../../../common/utils';

export function CreatePlaylist({
    playlists,
    songs,
    playlist,
    albums,
    setCreate,
    setPlaylists,
    selectedPlayList,
    setSelectedPlayList,
    actions
}) {
    const inputRef = useRef(null);
    const [editTitle, setEditTitle] = useState(false);
    const [addSong, setAddSong] = useState(false);

    useEffect(() => {
        actions.setPlaylist(
            selectedPlayList || {
                title: `Play List ${playlists.length + 1}`,
                songs: []
            }
        );
        inputRef.current.value = (selectedPlayList || {}).title
            || `Play List ${playlists.length + 1}`;
    }, []);

    const onEditName = e => {
        const value = e.target.value || `Play List ${playlists.length + 1}`;
        actions.setPlaylist({
            ...playlist,
            title: value
        })
        inputRef.current.value = value;
        setEditTitle(false);
    }

    const addSongToPlaylist = playlistSong => {
        const { songs: playlistSongs } = playlist;
        playlistSong.addedOn = new Date();
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

    const onSelectSave = () => {
        const updatedPlayList = [
            {
                ...playlist,
                createdOn: new Date(),
                id: playlists.length + 1
            },
            ...playlists,
        ]
        setItem('playList', updatedPlayList);
        setCreate(false);
        setPlaylists(updatedPlayList);
    }

    const onSelectCancel = () => {
        setCreate(false);
        setSelectedPlayList(null);
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleBoxWrap}>
                <div className={styles.titleBox}>
                    <EditIcon
                        titleAccess="Edit"
                        className={!editTitle ? styles.show : ''}
                        onClick={setEditTitle.bind(this, true)} />
                    <input
                        ref={inputRef}
                        onBlur={onEditName}
                        disabled={!editTitle}
                        defaultValue={playlist.title} />
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
                        classes={{
                            container: styles.songListAdd
                        }}
                        playlistConfig={{
                            type: 'add',
                            onSelectIcon: addSongToPlaylist,
                            classes: {
                                card: styles.card
                            }
                        }} />
                ) : (
                    <>
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
                        <div className={styles.songListView}>
                            {playlist.songs.map(song => (
                                <Card
                                    key={song.id}
                                    type="song"
                                    detail={song}
                                    albums={albums} />
                            ))}
                            {!playlist.songs.length
                                ? (
                                    <div className={styles.noDataWrap}>
                                        No Songs Found!!
                                    </div>
                                ) : null}
                        </div>
                        <div className={`${styles.btnWrap} ${styles.btnWrapFooter}`}>
                            <Button
                                onClick={onSelectCancel}
                                color="secondary"
                                name="Cancel" />
                            <Button
                                color="secondary"
                                name={selectedPlayList ? "Update" : "Save"}
                                onClick={onSelectSave}
                                disabled={!playlist.title} />
                        </div>
                    </>
                )
            }
        </div>
    );
}
