import { useState } from "react";

import { MUSIC } from "../../common/constants";

import Tabs from "../../components/Tabs";
import Playlists from "./Playlists";
import Songs from "./Songs";

import styles from "./Music.scss";

export function Music() {
    const [selectedTab, setSelectedTab] = useState('allSongs');

    const getSelectedTabView = () => {
        switch (selectedTab) {
            case "allSongs":
                return <Songs />;
            case "playlists":
                return <Playlists />;
            default:
                return null;
        }
    }

    return (
        <div className={styles.container}>
            <Tabs
                tabs={MUSIC.TABS}
                selectedTab={selectedTab}
                onClick={setSelectedTab} />
            {getSelectedTabView()}
        </div>
    );
}
