import { HeaderMenu } from './HeaderMenu';
import {fn} from "storybook/test";
import {Meta, StoryObj} from "@storybook/nextjs-vite";


const meta = {
    title: 'Layout/HeaderMenu',
    component: HeaderMenu,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        countMessage: {
            control: { type: 'number', min: 0 },
            description: 'Number of unread messages',
        },
        isLoggedIn: {
            control: 'boolean',
            description: 'User authentication status',
        },
        onClickHandler: {
            action: 'clicked',
            description: 'Notification icon click handler',
        },
    },
    args: {
        onClickHandler: fn(),
    },
} satisfies Meta<typeof HeaderMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Все состояния через args - без JSX
export const LoggedInNoMessages: Story = {
    args: {
        isLoggedIn: true,
        countMessage: 0,
    },
};

export const LoggedInWithMessages: Story = {
    args: {
        isLoggedIn: true,
        countMessage: 5,
    },
};

export const LoggedInWithManyMessages: Story = {
    args: {
        isLoggedIn: true,
        countMessage: 99,
    },
};

export const LoggedOut: Story = {
    args: {
        isLoggedIn: false,
        countMessage: 0,
    },
};

export const Interactive: Story = {
    args: {
        isLoggedIn: true,
        countMessage: 3,
    },
};