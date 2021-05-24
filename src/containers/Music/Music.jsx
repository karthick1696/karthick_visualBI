/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import styles from "./Music.scss";

export function Music({
    actions
}) {
    useEffect(() => {
        actions.getAllAlbums();
        actions.getAllSongs();
    }, []);

    return (
        <div />
    );
}
