/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from 'react';
import { shuffle } from 'lodash';

import EditIcon from '@material-ui/icons/Edit';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import Button from '../../../../components/Button';
import Card from '../../../../components/Card';
import Songs from '../../Songs';
import { setItem } from '../../../../common/utils';

import styles from "./CreatePlaylist.scss";
import { SECONDARY, STORAGE } from '../../../../common/constants';

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

        return () => {
            actions.setPlaylist({
                title: "",
                songs: []
            })
        }
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

    const deleteSongFromPlaylist = playlistSong => {
        const { songs: playlistSongs } = playlist;
        actions.setPlaylist({
            ...playlist,
            songs: playlistSongs.filter(song => song.id !== playlistSong.id),
        });
    }

    const onShuffleSongs = () => {
        actions.setPlaylist({
            ...playlist,
            songs: shuffle(playlist.songs)
        });
    }

    const onSelectSave = () => {
        if (!selectedPlayList) {
            const updatedPlayList = [
                {
                    ...playlist,
                    createdOn: new Date(),
                    id: playlists.length + 1
                },
                ...playlists,
            ]
            setItem(STORAGE.PLAY_LIST, updatedPlayList);
            setCreate(false);
            setPlaylists(updatedPlayList);

            return;
        }

        const indexToUpdate = playlists.findIndex(
            list => list.id === playlist.id
        );
        const updatedPlayList = {
            ...playlists[indexToUpdate],
            ...playlist,
            updatedOn: new Date(),
        };
        const updatedPlayLists = [...playlists];
        updatedPlayLists.splice(indexToUpdate, 1, updatedPlayList);
        const sortedPlayLists = updatedPlayLists.sort((a, b) => {
            const comp1 = new Date(a.updatedOn || a.createdOn).getTime();
            const comp2 = new Date(b.updatedOn || b.createdOn).getTime();

            return comp2 - comp1;
        })
        setItem(STORAGE.PLAY_LIST, sortedPlayLists);
        setSelectedPlayList(null);
        setPlaylists(sortedPlayLists);
    }

    const onSelectCancel = () => {
        setCreate(false);
        setSelectedPlayList(null);
    }

    const getHeaderSection = () => {
        return (
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
        );
    }

    const getFooterBtns = () => {
        return (
            <div className={`${styles.btnWrap} ${styles.btnWrapFooter}`}>
                <Button
                    onClick={onSelectCancel}
                    color={SECONDARY}
                    name="Cancel" />
                <Button
                    color={SECONDARY}
                    name={selectedPlayList ? "Update" : "Save"}
                    onClick={onSelectSave}
                    disabled={!playlist.title} />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {getHeaderSection()}
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
                                color={SECONDARY}
                                name="Shuffle Play" />
                            <Button
                                color={SECONDARY}
                                name="Add Song"
                                onClick={setAddSong.bind(this, true)} />
                        </div>
                        <div className={styles.songListView}>
                            {playlist.songs.map(song => (
                                <Card
                                    key={song.id}
                                    type="song"
                                    detail={song}
                                    albums={albums}
                                    playlistConfig={{
                                        type: "edit",
                                        onSelectIcon: deleteSongFromPlaylist,
                                        classes: {
                                            card: styles.card
                                        }
                                    }} />
                            ))}
                            {!playlist.songs.length
                                ? (
                                    <div className={styles.noDataWrap}>
                                        No Songs Found!!
                                    </div>
                                ) : null}
                        </div>
                        {getFooterBtns()}
                    </>
                )
            }
        </div>
    );
}
