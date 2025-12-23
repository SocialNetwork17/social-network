import {useEffect, useState} from "react";
import styles from './Snackbar.module.scss';
import {IconButton} from "@/shared/ui/IconButton/IconButton";

type SnackbarProps = {
    message?: string,
    type: 'success' | 'error'
}

export const Snackbar = (props: SnackbarProps) => {
    const { type, message} = props
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
    const [currentMessage, setCurrentMessage] = useState<string | undefined>(message);
    const [currentType, setCurrentType] = useState<'success' | 'error' | ''>(type);

    const startExitAnimation = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            setCurrentMessage('')
            setCurrentType('')
        }, 300);
    };

    const handleClose = () => {
        startExitAnimation();
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            startExitAnimation();
        }, 5000);
        return () => clearTimeout(timer);
    }, [message]);

    if (!isVisible || !currentMessage) return null;

    return (
        <div className={`${styles.snackbar} ${styles[currentType]} ${isExiting ? styles.exiting : ''}`}>
            <div className={styles.snackbarContent}>
                <span className={styles.snackbarMessage}>
                    {currentType === 'error' ? <b>Error! </b> : ''}{message}
                </span>
            </div>
            <div className={styles.snackbarClose}>
                <IconButton iconId={'logoutBtnCloseSvg'} fill="white" size={24} onClick={handleClose} />
            </div>
        </div>
    )
}