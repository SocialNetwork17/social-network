"use client"
import {Header} from "@/widgets/header/ui/Header";
import styles from "./rootLayout.module.scss";
import {useAuth} from "@/shared/hooks/useAuth";
import {Sidebar} from "@/widgets/Sidebar/ui/Sidebar";

type Props = {
    children: React.ReactNode
}

export const RootLayoutClient = ({children}: Props) => {

    const {isAuth, isLoading} = useAuth()

    return (
        <>
            <Header/>
            <div className={styles.layout}>
                {isAuth && <Sidebar/>}
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </>


    )
}