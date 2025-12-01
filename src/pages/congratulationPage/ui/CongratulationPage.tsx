"use client"
import styles from "./Congratulation.module.scss"
import {Button} from "@/shared/ui/Button/Button";
import Image from "next/image";
import congratulationImg from "@/../public/congratulation.svg"
import {useRouter} from "next/navigation";
import {PATH} from "@/shared/constants/routings";

export const CongratulationPage = () => {
    const router = useRouter();

    const onclickHandler = () => {
        router.push(PATH.SIGN_IN)
    }

    return (
        <div className={styles.congratulationPage}>
            <div className={styles.title}>
                Congratulations!
            </div>
            <div className={styles.description}>
                Your email has been confirmed
            </div>
            <div className={styles.buttonContainer}>
                <Button
                    variant={"primary"}
                    disabled={false}
                    onClickHandler={onclickHandler}
                >
                    Sign In
                </Button>
            </div>
            <Image src={congratulationImg} alt={'congratulation picture'}/>
        </div>
    );
};