'use client'
import { SuperCheckbox } from '../SuperCheckbox'
import { useState } from 'react'
import s from './SuperCheckboxDemo.module.css'

// Данные для демонстрации различных состояний чекбоксов
const checkboxesData = [
    { id: 1, label: 'Первый чекбокс', disabled: true, checked: true },  // Отключенный и выбранный
    { id: 2, label: 'Второй чекбокс', disabled: false, checked: false }, // Обычный невыбранный
    { id: 3, label: 'Третий чекбокс', disabled: false, checked: false }, // Обычный невыбранный
    { id: 4, label: 'Четвертый чекбокс', disabled: false, checked: false }, // Обычный невыбранный
    { id: 5, label: '', disabled: true, checked: false } // Отключенный без текста
]

export const SuperCheckboxDemo = () => {
    // Состояние для управления всеми чекбоксами
    const [checkboxes, setCheckboxes] = useState(checkboxesData)

    // Функция для обновления состояния конкретного чекбокса
    const updateCheckbox = (id: number, checked: boolean) => {
        setCheckboxes(prev => prev.map(checkbox =>
            // Обновляем только чекбокс с соответствующим id
            checkbox.id === id ? { ...checkbox, checked } : checkbox
        ))
    }

    return (
        <div>
            {/* Маппинг данных в компоненты чекбоксов */}
            {checkboxes.map(({ id, label, disabled, checked }) => (
                <div key={id} className={s.checkboxItem}>
                    {/* Компонент кастомного чекбокса */}
                    <SuperCheckbox
                        disabled={disabled}        // Передаем состояние disabled
                        checked={checked}          // Передаем текущее значение
                        onChangeCheckedAction={(checked) => updateCheckbox(id, checked)} // Обработчик изменения
                    >
                        {label} {/* Текст чекбокса */}
                    </SuperCheckbox>
                </div>
            ))}
        </div>
    )
}