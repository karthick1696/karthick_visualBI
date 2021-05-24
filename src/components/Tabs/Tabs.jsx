import styles from "./Tabs.scss";

export function Tabs({
    tabs,
    selectedTab,
    onClick
}) {
    return (
        <div className={styles.tabs}>
            {tabs.map(tab => (
                <span
                    key={tab.id}
                    className={tab.id === selectedTab ? styles.active : ''}
                    onClick={() => onClick(tab.id)}>
                    {tab.label}
                </span>
            ))}
        </div>
    );
}

Tabs.defaultProps = {
    tabs: [],
    selectedTab: '',
    onClick: () => { }
}
