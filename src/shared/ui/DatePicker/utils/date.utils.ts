import { format, parse } from 'date-fns'
import { ru } from 'date-fns/locale'
import { DateRange } from 'react-day-picker'

export const DATE_FORMAT = 'dd/MM/yyyy'
export const RANGE_SEPARATOR = ' - '

export const formatDate = (date: Date) =>
    format(date, DATE_FORMAT, { locale: ru })

export const parseDate = (value: string) =>
    parse(value, DATE_FORMAT, new Date())

export const isValidDate = (date: Date) =>
    !isNaN(date.getTime())

export const autoFormatDate = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 8)

    if (digits.length <= 2) return digits
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

export const formatRange = (range?: DateRange) => {
    if (!range?.from) return ''
    const from = formatDate(range.from)
    const to = range.to ? formatDate(range.to) : '...'
    return `${from}${RANGE_SEPARATOR}${to}`
}
