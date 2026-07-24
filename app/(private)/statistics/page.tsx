import { Suspense } from 'react'
import { StatisticsPage } from '@/pages/statistics/ui/StatisticsPage'
import { Loader } from '@/shared/ui/Loader/Loader'

export default function StatisticsRoute() {
    return (
        <Suspense fallback={<Loader />}>
            <StatisticsPage />
        </Suspense>
    )
}