import { getModalPostByIdServer } from '@/features/post/viewPost/api/getModalPostByIdServer'
import { FavoritesPage } from '@/pages/favorites/ui/FavoritesPage'

type Props = {
  searchParams: Promise<{ postId?: string }>
}

export default async function FavoritesRoute({ searchParams }: Props) {
  const { postId } = await searchParams

  const imageModalPost = postId ? await getModalPostByIdServer(Number(postId)) : undefined

  return <FavoritesPage imageModalPost={imageModalPost} />
}
