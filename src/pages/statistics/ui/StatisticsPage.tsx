'use client'

import { useStatisticsQuery } from '@/pages/statistics/api/useStatisticsQuery'
import styles from '@/pages/statistics/ui/StatisticsPage.module.scss'
import { Loader } from '@/shared/ui/Loader/Loader'
import { StatisticsChartBlock } from './StatisticsChartBlock/StatisticsChartBlock'

export const StatisticsPage = () => {
    const { data, isLoading, isError } = useStatisticsQuery()

    return (
        <section className={styles.statisticsContainer}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Statistics</h1>
                </div>
            </div>

            {isLoading && (
                <div className={styles.state}>
                    <Loader />
                </div>
            )}

            {isError && <div className={styles.state}>Failed to load statistics</div>}

            {data && (
                <div className={styles.charts}>
                    <StatisticsChartBlock data={data.likes} title="Likes" defaultPeriod="month" color="#cc1439" />
                    <StatisticsChartBlock data={data.comments} title="Comments" defaultPeriod="week" color="#397df6" />
                    <StatisticsChartBlock
                        data={data.publicationViews}
                        title="Publication views"
                        defaultPeriod="month"
                        color="#14cc70"
                    />
                </div>
            )}
        </section>
    )
}
