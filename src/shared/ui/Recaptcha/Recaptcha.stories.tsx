import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Recaptcha } from './Recaptcha'

const meta = {
  title: 'shared/ui/Recaptcha',
  component: Recaptcha,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Recaptcha>

export default meta

type Story = StoryObj<typeof Recaptcha>

export const Default: Story = {
  args: {

  },
}

export const Checked: Story = {
  args: {

  },
}

export const Loading: Story = {
  args: {

  },
}

export const Error: Story = {
  args: {

  },
}

export const Expired: Story = {
  args: {

  },
}
