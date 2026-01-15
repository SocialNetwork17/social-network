import { useAllPostsQuery } from '@/shared/api/useAllPostsQuery'
import styles from './PostsWithText.module.scss'
import CardWithText from '@/shared/ui/CardWithText/CardWithText'
import Skeleton from '../../Skeleton/Skeleton'

export default function PostsWith() {
  const { data: lastAddedPosts, isLoading } = useAllPostsQuery()

  return (
    <div className={styles.container}>
      {isLoading &&
        Array(4)
          .fill(null)
          .map(index => (
            <div className={styles.wpapper} key={index}>
              <Skeleton height={240} width={234} />
              <div className={styles.block}>
                <Skeleton height={36} width={36} bordeRadius={18} />
                <Skeleton height={16} width={82} />
              </div>
              <Skeleton height={16} width={63} />
              <Skeleton height={63} width={234} />
            </div>
          ))}
      {lastAddedPosts?.items.map(el => (
        <CardWithText post={el} key={el.id} />
      ))}
    </div>
  )
}
