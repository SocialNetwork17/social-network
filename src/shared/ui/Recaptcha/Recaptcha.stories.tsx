import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {Recaptcha} from './Recaptcha'

const meta = {
    title: "shared/ui/Recaptcha",
    component: Recaptcha,
    parameters: {
        layout: "centered",
    }
} satisfies Meta<typeof Recaptcha>

export default meta

type Story = StoryObj<typeof Recaptcha>

export const Default: Story = {
    args: {
        isLoading: false,
        isChecked: false,
        isError: false,
        isExpired: false,
    },
}

export const Checked: Story = {
    args: {
        isLoading: false,
        isChecked: true,
        isError: false,
        isExpired: false,
    },
}

export const Loading: Story = {
    args: {
        isLoading: true,
        isChecked: false,
        isError: false,
        isExpired: false,
    },
}

export const Error: Story = {
    args: {
        isLoading: false,
        isChecked: false,
        isError: true,
        isExpired: false,
    },
}

export const Expired: Story = {
    args: {
        isLoading: false,
        isChecked: false,
        isError: false,
        isExpired: true,
    },
}


