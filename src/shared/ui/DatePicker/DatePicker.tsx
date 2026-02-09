import styles from './DatePicker.module.scss'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { DayPicker, DateRange } from 'react-day-picker'
import 'react-day-picker/style.css'
import { ru } from 'date-fns/locale'
import { useEffect, useRef, useState, KeyboardEvent, ChangeEvent } from 'react'
import { Icon } from '@/shared/ui/Icon/Icon'
import { dayPickerStyleConfig } from './DatePickerConfig'
import {
  autoFormatDate,
  formatDate,
  formatRange,
  isValidDate,
  parseDate,
  DATE_FORMAT,
  RANGE_SEPARATOR,
} from './utils/date.utils'

// утилита для объединения классов
const cn = (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(' ')

type DatePickerMode = 'single' | 'range'

type DatePickerProps = {
  label: string
  error?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  mode?: DatePickerMode
  value?: Date | DateRange
  onChange: (date: Date | DateRange | undefined) => void
}

export const DatePicker = ({
  label,
  error,
  placeholder,
  className,
  disabled,
  mode = 'single',
  value,
  onChange,
}: DatePickerProps) => {
  const [inputValue, setInputValue] = useState('')
  const [validationError, setValidationError] = useState('')
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const closeRef = useRef<(() => void) | undefined>(undefined)

  /* Синхронизация value -> input */
  useEffect(() => {
    const id = setTimeout(() => {
      if (!value) {
        setInputValue('')
        return
      }

      if (mode === 'single' && value instanceof Date) {
        setInputValue(formatDate(value))
        setCurrentMonth(value)
      }

      if (mode === 'range' && 'from' in value) {
        setInputValue(formatRange(value))
        if (value.from) {
          setCurrentMonth(value.from)
        }
      }
    }, 0)

    return () => clearTimeout(id)
  }, [value, mode])

  /* Обработка ввода в инпуте */
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value

    if (mode === 'single') {
      setInputValue(autoFormatDate(raw))
      setValidationError('')
      return
    }

    // Range mode: ожидаем вид "dd/MM/yyyy - dd/MM/yyyy" или "dd/MM/yyyy - ..."
    // Разбиваем по разделителю; если пользователь еще не ввёл разделитель, вторая часть пустая
    const [from = '', to = ''] = raw.split(RANGE_SEPARATOR)
    const formatted = `${autoFormatDate(from)}${to ? RANGE_SEPARATOR + autoFormatDate(to) : ''}`

    setInputValue(formatted)
    setValidationError('')
  }

  /* apply вызывается на Enter или blur */
  const applySingle = () => {
    const date = parseDate(inputValue)

    if (!isValidDate(date)) {
      setValidationError(`Формат: ${DATE_FORMAT}`)
      return
    }

    onChange(date)
    setCurrentMonth(date)
    closeRef.current?.()
  }

  const applyRange = () => {
    const [fromStr, toStr] = inputValue.split(RANGE_SEPARATOR)
    if (!fromStr || !toStr) {
      setValidationError(`Формат: ${DATE_FORMAT} - ${DATE_FORMAT}`)
      return
    }

    const from = parseDate(fromStr)
    const to = parseDate(toStr)

    if (!isValidDate(from) || !isValidDate(to) || from > to) {
      setValidationError('Error, select current month or last month')
      return
    }

    onChange({ from, to })
    setCurrentMonth(from)
    closeRef.current?.()
  }

  const applyInput = () => {
    if (!inputValue) return
    mode === 'single' ? applySingle() : applyRange()
  }

  /*  Keyboard */

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') applyInput()
  }

  /* Выбор из календаря */
  // handleCalendarSelect — это функция, которая срабатывает каждый раз,
  // когда пользователь кликает по дате в календаре.
  const handleCalendarSelect = (selected?: Date | DateRange) => {
    setValidationError('')
    onChange(selected)

    if (!selected) {
      setInputValue('')
      return
    }

    if (mode === 'single') {
      const date = selected as Date
      setInputValue(formatDate(date))
      setCurrentMonth(date)
    } else {
      const range = selected as DateRange
      setInputValue(formatRange(range))
      if (range.from) setCurrentMonth(range.from)
    }
  }

  /* ----------------------------- UI --------------------------------------- */

  const displayError = validationError || error
  const hasError = Boolean(displayError)

  const computedPlaceholder =
    placeholder ||
    (mode === 'single'
      ? formatDate(new Date())
      : `${formatDate(new Date())}${RANGE_SEPARATOR}${formatDate(new Date())}`)

  return (
    <div className={cn(styles.datePickerWrapper, className)}>
      {label && <label className={styles.label}>{label}</label>}

      <Popover className={styles.popover}>
        {({ open, close }) => {
          closeRef.current = close

          return (
            <>
              <div className={styles.inputWrapper}>
                <input
                  className={cn(
                    styles.input,
                    disabled && styles.disabled,
                    hasError && styles.error,
                    open && styles.open
                  )}
                  value={inputValue}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  onBlur={applyInput}
                  placeholder={computedPlaceholder}
                  disabled={disabled}
                />
                <PopoverButton
                  className={cn(styles.calendarButton, hasError && styles.calendarButtonError)}
                  disabled={disabled}
                >
                  <Icon size={20} iconId={hasError ? 'alertCalendar' : 'calendar'} />
                </PopoverButton>
              </div>

              {open && (
                <PopoverPanel static className={styles.panel}>
                  <DayPicker
                    mode={mode}
                    selected={value as any}
                    onSelect={handleCalendarSelect as any}
                    month={currentMonth}
                    onMonthChange={setCurrentMonth}
                    locale={ru}
                    {...dayPickerStyleConfig}
                  />
                </PopoverPanel>
              )}
            </>
          )
        }}
      </Popover>
      {hasError && <div className={styles.errorMessage}>{displayError}</div>}
    </div>
  )
}
