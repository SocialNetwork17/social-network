"use client";

import React, {useState} from 'react';
import styles from './Header.module.scss'
import {HeaderMenu} from "./headerMenu/HeaderMenu";


export const Header = () => {

    const [countNotices, setCountNotices] = useState<number>(0)

    const onClickHandler = () => {
        setCountNotices(countNotices + 1)
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>Inctagram</h1>
            <HeaderMenu countMessage={countNotices} isLoggedIn={true} onClickHandler={onClickHandler}/>
        </header>
    );
};

