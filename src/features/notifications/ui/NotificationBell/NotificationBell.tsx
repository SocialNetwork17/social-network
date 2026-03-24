// @flow
import * as React from 'react';
import styles from "./NotificationBell.module.scss";
import {IconButton} from "@/shared/ui/IconButton/IconButton";
import {NotificationDropdown} from "@/features/notifications/ui/NotificationDropdown/NotificationDropdown";
import {useState} from "react";


export const NotificationBell = () => {

    const [toggleCollapsed, setToggleCollapsed] = useState<boolean>(true);

    return (
        <div className={styles.iconBox}>
            <IconButton
                onClick={() => setToggleCollapsed(prev => !prev)}
                iconId={'messageBell'}
                size={20}
                viewBox={'0 0 18 20'}
                fill={'white'}
            />
            {toggleCollapsed && <p className={styles.counterMessage}>{13}</p>}
            { !toggleCollapsed && <NotificationDropdown/>}
        </div>
    );
};