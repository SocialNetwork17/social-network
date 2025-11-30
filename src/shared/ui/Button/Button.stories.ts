import { Button } from './Button'
import { fn } from 'storybook/test'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'textButton'],
      description: 'Button style variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    width: {
      control: { type: 'number' },
      description: 'Button width',
    },
    height: {
      control: { type: 'number' },
      description: 'Button height',
    },
    onClickHandler: {
      action: 'clicked',
      description: 'Button click handler',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
  args: {
    onClickHandler: fn(),
    children: 'Button',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Primary variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    disabled: false,
  },
}

export const PrimaryDisabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
}

// Secondary variants
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    disabled: false,
  },
}

export const SecondaryDisabled: Story = {
  args: {
    variant: 'secondary',
    disabled: true,
  },
}

// Outline variants
export const Outline: Story = {
  args: {
    variant: 'outline',
    disabled: false,
  },
}

export const OutlineDisabled: Story = {
  args: {
    variant: 'outline',
    disabled: true,
  },
}

// Text button variants
export const TextButton: Story = {
  args: {
    variant: 'textButton',
    disabled: false,
  },
}

export const TextButtonDisabled: Story = {
  args: {
    variant: 'textButton',
    disabled: true,
  },
}

// Sizes
export const LargeButton: Story = {
  args: {
    variant: 'primary',
    width: 200,
    height: 50,
    disabled: false,
  },
}

export const SmallButton: Story = {
  args: {
    variant: 'primary',
    width: 100,
    height: 30,
    disabled: false,
  },
}

// With different text
export const WithLongText: Story = {
  args: {
    variant: 'primary',
    children: 'This is a very long button text',
    disabled: false,
  },
}

// Interactive example
export const Interactive: Story = {
  args: {
    variant: 'primary',
    disabled: false,
  },
}
