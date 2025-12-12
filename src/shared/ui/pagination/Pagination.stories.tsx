import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Pagination from './Pagination'

const meta = {
    title: "shared/ui/Pagination",
    component: Pagination,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        onPageChange: { action: 'changed' },
        onSelectChange: { action: 'changed' },
    },
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof Pagination>

export const PaginationOption: Story = {
    args: {
        totalItems: 100,
        itemsPerPage: 10,
        maxVisiblePages: 5,
        disabled: false,
    },
}