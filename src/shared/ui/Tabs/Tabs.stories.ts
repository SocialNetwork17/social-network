
import { Tabs } from './Tabs';
import {Meta, StoryObj} from "@storybook/nextjs-vite";

const meta = {
    title: 'Components/Tabs',
    component: Tabs,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;


type Story = StoryObj<typeof meta>;

export const Default: Story = {};
