import { useState } from "react";

import { MUSIC } from "../../common/constants";

import Tabs from "../../components/Tabs";
import Playlists from "./Playlists";
import Songs from "./Songs";
import Loading from "../../components/Loading";

import styles from "./Music.scss";

export function Music({ loading }) {
    const [selectedTab, setSelectedTab] = useState(MUSIC.ALL_SONGS);

    const getSelectedTabView = () => {
        switch (selectedTab) {
            case MUSIC.ALL_SONGS:
                return <Songs />;
            case MUSIC.PLAYLISTS:
                return <Playlists />;
            default:
                return null;
        }
    }

    return (
        <>
            <div className={styles.container}>
                <Tabs
                    tabs={MUSIC.TABS}
                    selectedTab={selectedTab}
                    onClick={setSelectedTab} />
                {getSelectedTabView()}
            </div>
            {loading ? <Loading /> : null}
        </>
    );
}
