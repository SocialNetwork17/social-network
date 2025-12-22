import {useEffect, useState} from "react";
import styles from './Snackbar.module.scss';

type SnackbarProps = {
    message: string,
    type: 'success' | 'error'
}

export const Snackbar = (props: SnackbarProps) => {
    const { type, message} = props
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    const startExitAnimation = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 300);
    };

    const handleClose = () => {
        startExitAnimation();
    };

    // useEffect(() => {
    //
    //     const timer = setTimeout(() => {
    //         startExitAnimation();
    //     }, 5000);
    //     return () => clearTimeout(timer);
    // }, [message]);

    if (!isVisible) return null;

    return (
        <div className={`${styles.snackbar} ${styles[type]} ${isExiting ? styles.exiting : ''}`}>
            <div className={styles.snackbarContent}>
                <span className={styles.snackbarMessage}>{type === 'error' ? <b>Error! </b> : ''}{message}</span>
            </div>
            <button className={styles.snackbarClose} onClick={handleClose}>
                ×
            </button>
        </div>
    )
}