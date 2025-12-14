import styles from "./LegalPage.module.scss"
import {Icon} from "@/shared/ui/Icon/Icon";
import Link from "next/link";
import {PATH} from "@/shared/constants/routings";

type Props = {
    title: string
    description: string
}

export const LegalPage = ({title, description}: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.backWrapper}>
                <Link className={styles.link} href={PATH.SIGN_UP}>
                    <Icon iconId={"arrow-back"}
                    />
                </Link>
                Back to Sign Up
            </div>
            <div className={styles.pageWrapper}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    )
}