import styles from './Skeleton.module.scss'

type Props = {
  width?: number | string
  height: number | string
  borderRadius?: number | string
}

export const Skeleton = ({ height, width = '100%', borderRadius = 2 }: Props) => {
  return (
      <div
          style={{ height, width, borderRadius }}
          className={styles.container}
      />
  )
}
