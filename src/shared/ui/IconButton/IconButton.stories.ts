import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { IconButton } from './IconButton';

const meta = {
    title: 'shared/ui/IconButton',
    component: IconButton,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        viewBox: { control: 'text' },
        onClick: { action: 'click' },
    },
} satisfies Meta<typeof IconButton>;

export default  meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        iconId: "logOut",
        width: "24",
        height: "24"
    }
}

export const Large: Story = {
    args: {
        ...Default.args,
        width: '100',
        height: '100'
    }
}

export const Small: Story = {
    args: {
        ...Default.args,
        width: "10",
        height: "10",
    }
}

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true
    }
}

export const InitColor: Story = {
    args: {
        ...Default.args,
        fill: 'red'
    }
}

export const InitViewBox: Story = {
    args: {
        ...Default.args,
        height: "200",
        width: "200",
        viewBox: "5 10 24 24"
    }
}
