import styles from './Skeleton.module.scss'

type Props = {
  width: number
  height: number
}

export default function Skeleton(props: Props) {
  const { height, width } = props

  return <div style={{ height: height, width: width}} className={styles.container}></div>
}
