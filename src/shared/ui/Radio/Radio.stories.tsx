import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Radio } from './Radio'
import { RadioGroup } from './RadioGroup'
import {useState} from "react";

const meta = {
    title: 'shared/ui/Radio',
    component: Radio,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Radio>

export default meta

type Story = StoryObj<typeof Radio>

export const States: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Radio label="Обычный" name="states" />
            <Radio label="Выбранный" checked name="states" />
            <Radio label="Отключенный" disabled name="states" />
            <Radio label="Отключенный Выбранный" disabled checked name="states" />
        </div>
    ),
}

export const DefaultWithText: Story = {
    args: {
        label: 'Выбрать этот вариант',
        name: 'default',
    },
}

export const Default: Story = {
    args: {
        name: 'default',
    },
}

export const DisabledWithText: Story = {
    args: {
        label: 'Выбрать этот вариант',
        disabled: true,
        name: 'disabled',
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
        checked: true,
        name: 'disabled',
    },
}

export const RadioGroupStory: StoryObj<typeof RadioGroup> = {
    render: () => {
        const [value, setValue] = useState('option1')

        return (
            <RadioGroup
                label="Выберите тариф"
                name="tariff"
                options={[
                    { value: 'option1', label: 'Базовый' },
                    { value: 'option2', label: 'Стандарт' },
                    { value: 'option3', label: 'Премиум' },
                    { value: 'option4', label: 'Недоступный', disabled: true },
                ]}
                value={value}
                onChange={setValue}
            />
        )
    },
}