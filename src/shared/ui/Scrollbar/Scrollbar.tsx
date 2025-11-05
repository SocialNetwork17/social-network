import styles from './Scrollbar.module.scss'

export const Scrollbar = ({ children }: { children: React.ReactNode }) => {
    return <div className={styles.scrollContainer}>{children}</div>
}
