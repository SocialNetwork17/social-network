import styles from "./SettingsSkeleton.module.scss"
import {Skeleton} from "@/shared/ui/Skeleton/Skeleton";

const inputs = [
    { height: 36 },
    { height: 36 },
    { height: 36 },
    { height: 36 },
];

export const SettingsSkeleton = () => {
    return (
        <div className={styles.skeletonContainer}>
            <div className={styles.uploadPhoto}>
                <Skeleton width={192} height={192} borderRadius={96} />
                <Skeleton width={192} height={36} />
            </div>

            <div className={styles.inputsContainer}>
                {inputs.map((_, index) => (
                    <div key={index} className={styles.inputContainer}>
                        <Skeleton height={20} width={100} />
                        <Skeleton height={36} />
                    </div>
                ))}

                <div className={styles.countryContainer}>
                    {[1, 2].map((_, index) => (
                        <div key={index} className={styles.inputContainer}>
                            <Skeleton height={20} width={100} />
                            <Skeleton height={36} />
                        </div>
                    ))}
                </div>

                <div className={styles.inputContainer}>
                    <Skeleton height={20} width={100} />
                    <Skeleton height={84} />
                </div>
            </div>
        </div>
    );
};