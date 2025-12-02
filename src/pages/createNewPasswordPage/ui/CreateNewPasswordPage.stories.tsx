import { CreateNewPasswordPage } from './CreateNewPasswordPage'
import {Meta, StoryObj} from "@storybook/nextjs-vite";

const meta = {
  title: 'shared/ui/CreateNewPasswordPage',
  component: CreateNewPasswordPage,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CreateNewPasswordPage>

export default meta

type Story = StoryObj<typeof CreateNewPasswordPage>

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
      <CreateNewPasswordPage />
    </div>
  ),
}


