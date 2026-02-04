"use client"
import {Header} from "@/widgets/header/ui/Header";
import styles from "./rootLayout.module.scss";
import {useAuth} from "@/shared/hooks/useAuth";
import {Sidebar} from "@/widgets/sidebar/ui/Sidebar";
import {ModalProvider} from "@/widgets/modal/model/modal.provider";


type Props = {
    children: React.ReactNode
}

export const RootLayoutClient = ({children}: Props) => {

    const {isAuth} = useAuth()

    return (
        <ModalProvider>
            <Header/>
            <div className={styles.layout}>
                {isAuth && <Sidebar/>}
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </ModalProvider>
    )
}