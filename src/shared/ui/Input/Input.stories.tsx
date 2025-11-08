import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {Input} from './Input'

const meta = {
    title: "shared/ui/Input",
    component: Input,
    parameters: {
        layout: "centered",
    }
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof Input>

export const Email: Story = {
    args: {
        label: "Email",
        type: "email",
        placeholder: "Epam@example.com",
        required: false,
    },
}

export const Password: Story = {
    args: {
        label: "Password",
        type: "password",
        placeholder: "add password",
        required: false,
    },
}

export const InputRequired: Story = {
    args: {
        label: "Password",
        type: "password",
        placeholder: "add password",
        required: true,
    },
}

export const InputError: Story = {
    args: {
        label: "Password",
        type: "password",
        placeholder: "add password",
        required: true,
        error: true,
        errorText: "The password is too short",
    },
}

export const InputDisabled: Story = {
    args: {
        label: "Password",
        type: "password",
        placeholder: "add password",
        disabled: true,
    },
}