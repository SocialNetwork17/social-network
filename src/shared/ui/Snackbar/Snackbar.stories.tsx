import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {Snackbar} from "@/shared/ui/Snackbar/Snackbar";

const meta = {
  title: 'shared/ui/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Snackbar>

export default meta

type Story = StoryObj<typeof Snackbar>

export const Error: Story = {
  args: {
    type: "error",
    message: 'Server is not available'
  },
}

export const Success: Story = {
  args: {
    type: "success",
    message: 'Your settings are saved'
  },
}
