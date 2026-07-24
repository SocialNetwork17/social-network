'use client'

import { useState } from 'react'
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import type { TooltipContentProps } from 'recharts'

import styles from './StatisticsChartBlock.module.scss'

export type StatisticsPeriod = 'week' | 'month'

export type StatisticsChartPoint = {
    label: string
    value: number
}

type Props = {
    title: string
    data: Record<StatisticsPeriod, StatisticsChartPoint[]>
    color?: string
    defaultPeriod?: StatisticsPeriod
}

const periods: { label: string; value: StatisticsPeriod }[] = [
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
]

const yTicks = [0, 50, 100, 300, 500, 1000]

const ChartTooltip = ({ active, payload, title }: TooltipContentProps & { title: string }) => {
    const value = payload?.[0]?.value

    if (!active || value === undefined) return null

    return (
        <div className={styles.tooltip}>
            {value} {title}
        </div>
    )
}

export const StatisticsChartBlock = ({ title, data, color = '#397df6', defaultPeriod = 'month' }: Props) => {
    const [activePeriod, setActivePeriod] = useState<StatisticsPeriod>(defaultPeriod)

    const chartData = data[activePeriod]
    const firstPoint = chartData[0]
    const lastPoint = chartData.at(-1)
    const xTicks = firstPoint && lastPoint ? [firstPoint.label, lastPoint.label] : []

    return (
        <section className={styles.chartBlock}>
            <header className={styles.header}>
                <h2 className={styles.title}>{title}</h2>

                <div className={styles.periods} aria-label={`${title} period`}>
                    {periods.map(period => (
                        <button
                            key={period.value}
                            className={`${styles.periodButton} ${activePeriod === period.value ? styles.active : ''}`}
                            type="button"
                            onClick={() => setActivePeriod(period.value)}
                        >
                            {period.label}
                        </button>
                    ))}
                </div>
            </header>

            <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 12, right: 14, bottom: 4, left: -22 }}>
                        <CartesianGrid stroke="#333333" vertical={false} />
                        <XAxis
                            dataKey="label"
                            ticks={xTicks}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#8d9094', fontSize: 10 }}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            domain={[0, 1000]}
                            ticks={yTicks}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#8d9094', fontSize: 10 }}
                        />
                        <Tooltip
                            content={tooltipProps => <ChartTooltip {...tooltipProps} title={title} />}
                            cursor={{ stroke: '#4c4c4c', strokeWidth: 1 }}
                        />
                        <Line
                            type="linear"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, fill: color, stroke: color }}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </section>
    )
}
