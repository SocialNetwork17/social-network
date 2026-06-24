import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import SelectBox, { BaseOption } from './SelectBox'

const meta = {
  title: 'shared/ui/select-box',
  component: SelectBox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof SelectBox>

export default meta

type Story = StoryObj<typeof SelectBox>

const options: BaseOption[] = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
  { id: '4', label: 'Option 4' },
  { id: '5', label: 'Option 5' },
  { id: '6', label: 'Option 6' },
  { id: '7', label: 'Option 7' },
  { id: '8', label: 'Option 8' },
]

const optionsWithIcons = [
  { id: '1', label: 'United States', countryCode: 'US' },
  { id: '2', label: 'United Kingdom', countryCode: 'GB' },
  { id: '3', label: 'Canada', countryCode: 'CA' },
]

export const Select: Story = {
  args: {
    label: 'Select an option',
    options: options,
    placeholder: 'Select an option',
    disabled: false,
  },
}

export const SelectWithIcons: Story = {
  args: {
    label: 'Select an option',
    options: optionsWithIcons,
    defaultValue: optionsWithIcons[1],
    disabled: false,
  },
}
