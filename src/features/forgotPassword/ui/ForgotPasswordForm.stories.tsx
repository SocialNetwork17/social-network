import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {ForgotPasswordForm} from './ForgotPasswordForm'

const meta = {
  title: 'shared/ui/ForgotPasswordForm',
  component: ForgotPasswordForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ForgotPasswordForm>

export default meta

type Story = StoryObj<typeof ForgotPasswordForm>

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ForgotPasswordForm />
    </div>
  ),
}


