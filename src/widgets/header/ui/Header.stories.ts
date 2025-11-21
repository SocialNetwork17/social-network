
import { Header } from './Header';
import {Meta, StoryObj} from "@storybook/nextjs-vite";

const meta = {
    title: 'Layout/Header',
    component: Header,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInitialState: Story = {
    parameters: {
        // Можно добавить моки или провайдеры если нужно
    },
};