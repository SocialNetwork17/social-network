"use client";

import styles from "./Tabs.module.scss"
import {useState} from "react";


export const Tabs = () => {

    const [activeTab, setActiveTab] = useState<number>(0)

    const onClickHandler = (index: number) => {
        setActiveTab(index)
    }

    const tabs = ["General information", "Devices", "Account Management", "My payments"]


    const tabClassActive = `${styles.tab} ${styles.primary}`
    const tabClassInActive = `${styles.tab} ${styles.secondary}`

    return (
        <div>
            <div style={{display: 'flex'}}>

                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={activeTab === index ? tabClassActive : tabClassInActive}
                        onClick={() => onClickHandler(index)}
                    >
                        {tab}
                    </button>
                ))}

            </div>
        </div>
    );
};
