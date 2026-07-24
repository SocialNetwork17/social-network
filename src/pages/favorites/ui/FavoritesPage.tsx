'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Suspense, useMemo } from 'react'
import { ImageModalServer } from '@/features/post/viewPost/ui/ImageModalServer'
import { useFavoritePostsQuery } from '@/pages/favorites/api/useFavoritePostsQuery'
import { SchemaPostViewModel } from '@/shared/api/schema'
import { useAuth } from '@/shared/hooks/useAuth'
import { Loader } from '@/shared/ui/Loader/Loader'
import styles from './FavoritesPage.module.scss'

type Props = {
  imageModalPost?: SchemaPostViewModel
}

export const FavoritesPage = ({ imageModalPost }: Props) => {
  const { isAuth, isLoading: isAuthLoading } = useAuth()
  const { data, isLoading, postIds } = useFavoritePostsQuery(isAuth)

  const favoritePosts = useMemo(
    () =>
      data?.flatMap(post => {
        const image = post.images[0]

        if (!image) return []

        return [
          {
            id: post.id,
            imageUrl: image.url,
            alt: post.description || `Publication by ${post.userName}`,
          },
        ]
      }) ?? [],
    [data]
  )

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Favorites</h1>

      {isAuthLoading || isLoading ? (
        <Loader />
      ) : !isAuth ? (
        <p className={styles.empty}>Sign in to see favorite publications</p>
      ) : postIds.length > 0 && isLoading ? (
        <Loader />
      ) : favoritePosts.length > 0 ? (
        <div className={styles.grid}>
          {favoritePosts.map(post => (
            <Link
              className={styles.item}
              href={`/favorites?postId=${post.id}`}
              key={post.id}
              scroll={false}
            >
              <Image
                src={post.imageUrl}
                alt={post.alt}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 228px"
              />
            </Link>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No favorite publications yet</p>
      )}

      {imageModalPost && (
        <Suspense fallback={<Loader />}>
          <ImageModalServer imageModalPost={imageModalPost} />
        </Suspense>
      )}
    </section>
  )
}
