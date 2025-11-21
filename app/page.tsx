// import styles from "../../app/page.module.css";
import MainPage from "@/pages/main/ul/MainPage";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
            <MainPage/>
        </div>
    );
}
