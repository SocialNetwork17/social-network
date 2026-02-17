import styles from "./SettingsSkeleton.module.scss"
export const SettingsSkeleton = () => {
    return (
        <div className={styles.skeletonContainer}>
            <div className={styles.uploadPhoto}>
                <div className={styles.photoRing}></div>
                <div className={styles.photoButton}></div>
            </div>

        </div>
    );
};