import styles from "./SingUpForm.module.scss"
import {SingUpFormTitle} from "@/features/singUp/ui/singUpFormTitle/SingUpFormTitle";
import {Input} from "@/shared/ui/Input/Input";
import {Checkbox} from "@/shared/ui/Checkbox/Checkbox";
import Link from "next/link";
import {PATH} from "@/shared/constants/routings";


type Props = {

};

export const SingUpForm = (props: Props) => {



    return (
        <div className={styles.authCard}>
            <SingUpFormTitle/>
            <form className={styles.inputWrapper}>
                <Input
                    label={"Username"}
                    type={"text"}
                    placeholder={"Epam11"}
                    required={true}
                />
                <Input
                    label={"Email"}
                    type={"email"}
                    placeholder={"Epam@epam.com"}
                    required={true}
                />
                <Input
                    label={"Password"}
                    type={"password"}
                    placeholder={"add password"}
                    required={true}
                />
                <Input
                    label={"Password confirmation"}
                    type={"password"}
                    placeholder={"confirm password"}
                    required={true}
                />
                <div className={styles.confirmWrapper}>
                    <Checkbox/>
                    <span className={styles.agreeText}>
                        I agree to the {" "}
                        <Link href={PATH.SERVICES}
                              className={styles.link}
                        >
                            Terms of Service {" "}
                        </Link>
                        and {" "}
                        <Link href={PATH.POLICY}
                              className={styles.link}>
                            Privacy Policy
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
};