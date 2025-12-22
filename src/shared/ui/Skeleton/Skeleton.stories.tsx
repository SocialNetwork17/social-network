import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Skeleton from './Skeleton'

const meta = {
  title: 'shared/ui/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: {
    width: 200,
    height: 200,
  },
  render: args => (
    <>
      <Skeleton {...args} />
    </>
  ),
}
