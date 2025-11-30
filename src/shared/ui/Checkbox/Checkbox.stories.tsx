import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'shared/ui/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof Checkbox>

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox label="Обычный" />
      <Checkbox label="Выбранный" checked />
      <Checkbox label="Отключенный" disabled />
      <Checkbox label="Отключенный Выбранный" disabled checked />
    </div>
  ),
}

export const DefaultWithText: Story = {
  args: {
    label: 'Согласен с условиями',
  },
}

export const Default: Story = {
  args: {},
}

export const DisabledWithText: Story = {
  args: {
    label: 'Согласен с условиями',
    disabled: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: true,
  },
}
