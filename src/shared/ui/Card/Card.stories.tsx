import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { usersData } from '@/entites/profile/userData'
import Card from './Card'

const meta = {
  title: 'shared/ui/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    images: usersData[1]?.posts,
    alt: 'картинка',
    slider: true,
    variant: 'rectangle',
  },
  render: args => (
    <div style={{ width: '300px', height: '300px' }}>
      <Card {...args} />
    </div>
  ),
}

export const CardRectangle: Story = {
  render: () => (
    <div style={{ width: '300px', height: '300px' }}>
      <Card images={usersData[1]?.posts || []} />
    </div>
  ),
}

export const CardCircular: Story = {
  render: () => (
    <div style={{ width: '300px', height: '300px' }}>
      <Card images={usersData[1]?.posts || []} variant="circular" alt="avatar" />
    </div>
  ),
}

export const Slider: Story = {
  render: () => (
    <div style={{ width: '300px', height: '300px' }}>
      <Card images={usersData[1]?.posts || []} slider={true} />
    </div>
  ),
}
