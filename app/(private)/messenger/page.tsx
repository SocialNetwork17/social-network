import { Suspense } from 'react'
import { MessengerPage } from '@/features/messenger/ui/MessengerPage'
import { Loader } from '@/shared/ui/Loader/Loader'

export default function MessengerRoute() {
  return (
    <Suspense fallback={<Loader />}>
      <MessengerPage />
    </Suspense>
  )
}
