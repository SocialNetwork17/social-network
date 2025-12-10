'use client'

import React from 'react'
import type { DayPickerProps } from 'react-day-picker'
import { MonthButton, type MonthButtonProps } from '@/shared/ui/DatePicker/MonthButton/MonthButton'

// ==================== КНОПКИ НАВИГАЦИИ ====================
export const dayPickerNavigationComponents = {
    PreviousMonthButton: (props: Omit<MonthButtonProps, 'iconId'>) =>
        React.createElement(MonthButton, { iconId: 'arrow-ios-back', ...props }),
    NextMonthButton: (props: Omit<MonthButtonProps, 'iconId'>) =>
        React.createElement(MonthButton, { iconId: 'arrow-ios-forward', ...props }),
}

// ==================== ОСНОВНОЙ КОНФИГ ====================
export const dayPickerStyleConfig: Partial<DayPickerProps> = {
    showOutsideDays: true,
    weekStartsOn: 1,
    numberOfMonths: 1,

    modifiers: {
        weekend: { dayOfWeek: [0, 6] },
    },

    modifiersClassNames: {
        selected: 'rdp-day_selected',
        range_start: 'rdp-day_range_start',
        range_middle: 'rdp-day_range_middle',
        range_end: 'rdp-day_range_end',
        today: 'rdp-day_today',
        weekend: 'rdp-day_weekend',
    },

    components: dayPickerNavigationComponents,

    styles: {
        root: {
            '--rdp-accent-color': '#ffffff',
            '--rdp-accent-background-color': '#6a6ff8',
            '--rdp-selected-color': '#ffffff',
            '--rdp-selected-background-color': '#4ad5ff',
        } as React.CSSProperties,
    },

    classNames: {
        day: 'rdp-custom_day',
        day_selected: 'rdp-custom_day_selected',
        day_range_start: 'rdp-custom_day_range_start',
        day_range_middle: 'rdp-custom_day_range_middle',
        day_range_end: 'rdp-custom_day_range_end',
    },
}
