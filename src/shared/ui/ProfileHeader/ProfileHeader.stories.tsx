import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {ProfileHeader} from './ProfileHeader'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProfileCountsProvider } from '@/entites/profile/model/profileCounts.provider'

// Создаем клиент React Query
const queryClient = new QueryClient()

const meta = {
  title: 'shared/ui/ProfileHeader',
  component: ProfileHeader,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProfileHeader>

export default meta

type Story = StoryObj<typeof ProfileHeader>

export const Default: Story = {
  args: {
    user: {
      id: 1,
      userName: 'user1',
      firstName: 'John',
      lastName: 'Doe',
      city: 'London',
      country: 'Great Britain',
      region: 'Cambridgeshire',
      dateOfBirth: '2020-01-01',
      aboutMe: 'About me',
      avatars: [
        {
          url: '/mock-images/userPhoto-1.png',
          width: 300,
          height: 300,
          fileSize: 300,
          createdAt: '2025-12-22T13:49:27.575Z',
        },
      ],
      createdAt: '2025-12-22T13:49:27.575Z',
    },
    type: 'profile',
  },
  render: args => (
    <QueryClientProvider client={queryClient}>
      <ProfileCountsProvider>
        <ProfileHeader {...args} />
      </ProfileCountsProvider>
    </QueryClientProvider>
  ),
}
