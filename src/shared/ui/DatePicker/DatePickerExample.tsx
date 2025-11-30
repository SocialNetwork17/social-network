'use client'

import { DatePicker } from '@/shared/ui/DatePicker/DatePicker'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

export function DatePickerExample() {
    const [birthDate, setBirthDate] = useState<Date | DateRange | undefined>()
    const [vacationRange, setVacationRange] = useState<Date | DateRange | undefined>()

    return (
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 40 }}>
            <DatePicker
                label="Date of birth"
                mode="single"
                value={birthDate}
                onChange={setBirthDate}
            />

            <DatePicker
                label="Диапазон дат"
                mode="range"
                value={vacationRange}
                onChange={setVacationRange}
            />

            <DatePicker
                label="disabled"
                mode="range"
                value={vacationRange}
                onChange={setVacationRange}
                disabled={true}
            />
        </div>
    )
}