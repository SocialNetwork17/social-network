import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { usersData } from '@/entites/profile/userData'
import UserProfile from './UserProfile'

const meta = {
  title: 'shared/ui/UserProfile',
  component: UserProfile,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof UserProfile>

export default meta

type Story = StoryObj<typeof UserProfile>

export const Default: Story = {
  args: {
    user: usersData[1],
    type: 'profile',
  },
  render: args => (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <UserProfile {...args} />
    </div>
  ),
}

export const MyProfile: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <UserProfile user={usersData[1]} type="profile" />
    </div>
  ),
}

export const FriendProfile: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <UserProfile user={usersData[2]} type="friend" />
    </div>
  ),
}

export const PublicProfile: Story = {
  render: args => (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <UserProfile user={usersData[3]} type="user" />
    </div>
  ),
}
