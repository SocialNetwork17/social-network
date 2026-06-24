import {HeaderMenu} from './HeaderMenu'
import {Meta, StoryObj} from '@storybook/nextjs-vite'

const meta = {
  title: 'Layout/HeaderMenu',
  component: HeaderMenu,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    isLoggedIn: {
      control: 'boolean',
      description: 'User authentication status',
    },

  },
} satisfies Meta<typeof HeaderMenu>

export default meta
type Story = StoryObj<typeof meta>

// Все состояния через args - без JSX
export const LoggedInNoMessages: Story = {
  args: {
    isLoggedIn: true,

  },
}

export const LoggedInWithMessages: Story = {
  args: {
    isLoggedIn: true,
  },
}

export const LoggedInWithManyMessages: Story = {
  args: {
    isLoggedIn: true,
  },
}

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
  },
}

export const Interactive: Story = {
  args: {
    isLoggedIn: true,
  },
}
