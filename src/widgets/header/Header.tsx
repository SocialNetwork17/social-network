import styles from "./Header.module.scss"

type Props = {

};
export const Header = (props: Props) => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                Header
            </div>
        </header>
    );
};
