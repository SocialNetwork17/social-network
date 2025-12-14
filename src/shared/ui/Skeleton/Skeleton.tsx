import styles from './Skeleton.module.scss'

type Props = {
  width: number
  height: number
  bordeRadius?: number
}

export default function Skeleton(props: Props) {
  const { height, width, bordeRadius = 2 } = props

  return <div style={{ height: height, width: width, borderRadius: bordeRadius}} className={styles.container}></div>
}
