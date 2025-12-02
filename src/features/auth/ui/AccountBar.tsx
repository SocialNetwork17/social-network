'use client'

import { useMeQuery } from "@/features/auth/api/useMeQuery";
import Link from "next/link";
import { PATH } from "@/shared/constants/routings";
import styles from "@/features/signIn/ui/SignInForm.module.scss";

export const AccountBar = () => {
    const { data: user, isLoading, isPending } = useMeQuery();

    if (isLoading) return <span></span>; // пока идет запрос, можно вернуть пустое место или спиннер
    if(isPending) return <span></span>

    return (
        <div>
            {!user && (
                <>
                    <Link href={PATH.SIGN_UP} className={styles.signUpLink}>
                        Sign Up
                    </Link>
                    <Link href={PATH.SIGN_IN} className={styles.signUpLink}>
                        Sign In
                    </Link>
                </>
            )}
            {/* если user есть, ничего не показываем */}
        </div>
    );
};
