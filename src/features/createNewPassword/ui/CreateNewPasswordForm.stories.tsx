import { CreateNewPasswordForm } from './CreateNewPasswordForm'
import {Meta, StoryObj} from "@storybook/nextjs-vite";

const meta = {
  title: 'shared/ui/CreateNewPasswordForm',
  component: CreateNewPasswordForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CreateNewPasswordForm>

export default meta

type Story = StoryObj<typeof CreateNewPasswordForm>

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
      <CreateNewPasswordForm />
    </div>
  ),
}


