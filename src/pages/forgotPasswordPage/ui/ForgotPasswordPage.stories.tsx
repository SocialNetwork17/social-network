import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {ForgotPasswordPage} from './ForgotPasswordPage'

const meta = {
  title: 'shared/ui/ForgotPasswordPage',
  component: ForgotPasswordPage,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ForgotPasswordPage>

export default meta

type Story = StoryObj<typeof ForgotPasswordPage>

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
      <ForgotPasswordPage />
    </div>
  ),
}


