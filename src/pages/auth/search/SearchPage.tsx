"use client";

import styles from "./SearchPage.module.scss";
import {SearchInput} from "@/shared/ui/SearchInput/SearchInput";


export const SearchPage = () => {


    return (
        <div className={styles.container}>
            <div className={styles.userTop}>
                <SearchInput placeholder={"Search input"} />
            </div>

                <div className={styles.endMessage}>🎉 Вы просмотрели все посты!</div>

        </div>
    );
};
