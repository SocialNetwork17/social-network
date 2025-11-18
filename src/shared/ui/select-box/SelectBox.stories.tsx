import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SelectBox, {Option} from './SelectBox'

const meta = {
    title: "shared/ui/SelectBox",
    component: SelectBox,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        onChange: { action: 'changed' },
    },
} satisfies Meta<typeof SelectBox>

export default meta

type Story = StoryObj<typeof SelectBox>

const options: Option[] = [
    {id: "1", label: "Option 1"},
    {id: "2", label: "Option 2"},
    {id: "3", label: "Option 3"},
    {id: "4", label: "Option 4"},
    {id: "5", label: "Option 5"},
    {id: "6", label: "Option 6"},
    {id: "7", label: "Option 7"},
    {id: "8", label: "Option 8"},
];

export const Select: Story = {
    args: {
        options: options,
        placeholder: "Select an option",
        disabled: false,
    },
}