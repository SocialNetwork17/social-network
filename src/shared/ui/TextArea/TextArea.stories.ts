import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TextArea } from './TextArea'

const meta = {
  title: 'shared/ui/Textarea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof TextArea>

export default meta

type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  args: {
    label: 'Add comment',
    placeholder: 'type text',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Add comment',
    placeholder: 'type text',
    disabled: true,
  },
}

export const Error: Story = {
  args: {
    label: 'Add comment',
    placeholder: 'type text',
    error: true,
    errorText: 'Yor comment is too long',
  },
}
