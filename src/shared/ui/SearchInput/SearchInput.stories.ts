import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {SearchInput} from './SearchInput'

const meta = {
    title: "shared/ui/Search Input",
    component: SearchInput,
    parameters: {
        layout: "centered",
    }
} satisfies Meta<typeof SearchInput>

export default meta

type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
    args: {
        placeholder: "search...",
    }
}

export const Disabled: Story = {
    args: {
        placeholder: "search...",
        disabled: true
    }
}

export const Error: Story = {
    args: {
        placeholder: "search...",
        error: true,
        errorText: "The title must have not more 100 symbols"
    }
}