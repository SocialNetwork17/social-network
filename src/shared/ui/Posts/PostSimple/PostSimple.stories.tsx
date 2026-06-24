import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {PostSimple} from './PostSimple'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Создаем клиент React Query
const queryClient = new QueryClient();

const meta = {
  title: 'shared/ui/Post/PostSimple',
  component: PostSimple,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PostSimple>

export default meta

type Story = StoryObj<typeof PostSimple>

export const Default: Story = {
  render: args => (
    <QueryClientProvider client={queryClient}>
      <div style={{ width: '1200px', height: '800px' }}>
        <PostSimple {...args} />
      </div>
    </QueryClientProvider>
  ),
}
