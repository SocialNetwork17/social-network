import type { Meta, StoryObj } from '@storybook/nextjs-vite'

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
    images: [
      '/mock-images/card-image-1.png',
      '/mock-images/card-image-2.png',
      '/mock-images/card-image-3.png',
      '/mock-images/card-image-4.png',
      '/mock-images/card-image-5.png',
      '/mock-images/card-image-6.png',
      '/mock-images/card-image-3.png',
      '/mock-images/card-image-4.png',
    ],
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


