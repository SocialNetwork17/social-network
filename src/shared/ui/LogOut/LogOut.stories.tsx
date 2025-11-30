import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LogOut } from './LogOut'

const meta = {
  title: 'shared/ui/LogOut',
  component: LogOut,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LogOut>

export default meta

type Story = StoryObj<typeof LogOut>

export const Default: Story = {
  args: {
    email: 'Epam@example.com',
    isOpen: true,
  },
}
