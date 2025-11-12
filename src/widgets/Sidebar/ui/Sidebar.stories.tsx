// Sidebar.stories.tsx

import { SidebarLinkUI } from './SidebarLink/SidebarLinkUI'
import {SidebarUI} from "@/widgets/Sidebar/ui/SidebarUI";
import {Meta, StoryObj} from "@storybook/nextjs-vite";
//import type { Meta, StoryObj } from '@storybook/react'


const meta = {
    title: 'shared/ui/Sidebar',
    component: SidebarUI,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof SidebarUI>

export default meta
type Story = StoryObj<typeof meta>

// Базовые элементы для переиспользования
const DefaultMainItems = (
    <>
        <SidebarLinkUI label="Feed" icon="feed" state="default" />
        <SidebarLinkUI label="Create" icon="create" state="default" />
        <SidebarLinkUI label="My Profile" icon="myProfile" state="default" />
        <SidebarLinkUI label="Messenger" icon="messenger" state="default" />
        <SidebarLinkUI label="Search" icon="search" state="default" />
    </>
)

const DefaultBottomItems = (
    <>
        <SidebarLinkUI label="Statistics" icon="statistic" state="default" />
        <SidebarLinkUI label="Favorites" icon="favorites" state="default" />
    </>
)

// Дефолтное состояние
export const Default: Story = {
    args: {
        mainItems: DefaultMainItems,
        bottomItems: DefaultBottomItems,
        onLogout: () => alert('Logout clicked'),
    },
    render: (args) => (
        <div style={{ display: 'flex' }}>
            <SidebarUI {...args} />
            <div style={{ marginLeft: '220px', padding: '20px' }}>
                <h1>Основной контент страницы</h1>
                <p>Полная структура сайдбара с основными ссылками и кнопкой выхода</p>
            </div>
        </div>
    ),
}

// Активные ссылки
export const ActiveLinks: Story = {
    args: {
        mainItems: (
            <>
                <SidebarLinkUI label="Feed" icon="feed" state="default" />
                <SidebarLinkUI label="Create" icon="create" state="default" />
                <SidebarLinkUI label="My Profile" icon="myProfile" state="active" />
                <SidebarLinkUI label="Messenger" icon="messenger" state="default" />
                <SidebarLinkUI label="Search" icon="search" state="default" />
            </>
        ),
        bottomItems: DefaultBottomItems,
        onLogout: () => alert('Logout clicked'),
    },
    render: (args) => (
        <div style={{ display: 'flex' }}>
            <SidebarUI {...args} />
            <div style={{ marginLeft: '220px', padding: '20px' }}>
                <h1>Страница профиля</h1>
                <p>Ссылка "My Profile" активна, остальные в обычном состоянии</p>
            </div>
        </div>
    ),
}

// Состояние наведения
export const HoverState: Story = {
    parameters: {
        pseudo: {
            hover: ['.hover-link', '.hover-logout'],
        },
    },
    args: {
        mainItems: (
            <>
                <SidebarLinkUI label="Feed" icon="feed" state="default" />
                <SidebarLinkUI label="Create" icon="create" state="hover" />
                <SidebarLinkUI label="My Profile" icon="myProfile" state="default" />
                <SidebarLinkUI label="Messenger" icon="messenger" state="default" />
                <SidebarLinkUI label="Search" icon="search" state="default" />
            </>
        ),
        bottomItems: (
            <>
                <SidebarLinkUI label="Statistics" icon="statistic" state="hover" />
                <SidebarLinkUI label="Favorites" icon="favorites" state="default" />
            </>
        ),
        onLogout: () => alert('Logout clicked'),
        logoutState: 'hover',
    },
    render: (args) => (
        <div style={{ display: 'flex' }}>
            <SidebarUI {...args} />
            <div style={{ marginLeft: '220px', padding: '20px' }}>
                <h1>Страница с hover</h1>
                <p>Ссылки "Create", "Statistics" и кнопка "Log Out" в состоянии наведения</p>
            </div>
        </div>
    ),
}

// Отключенные ссылки
export const DisabledLinks: Story = {
    args: {
        mainItems: (
            <>
                <SidebarLinkUI label="Feed" icon="feed" state="default" />
                <SidebarLinkUI label="Create" icon="create" state="default" />
                <SidebarLinkUI label="My Profile" icon="myProfile" state="default" />
                <SidebarLinkUI label="Messenger" icon="messenger" state="disabled" />
                <SidebarLinkUI label="Search" icon="search" state="disabled" />
            </>
        ),
        bottomItems: (
            <>
                <SidebarLinkUI label="Statistics" icon="statistic" state="disabled" />
                <SidebarLinkUI label="Favorites" icon="favorites" state="disabled" />
            </>
        ),
        onLogout: () => alert('Logout clicked'),
    },
    render: (args) => (
        <div style={{ display: 'flex' }}>
            <SidebarUI {...args} />
            <div style={{ marginLeft: '220px', padding: '20px' }}>
                <h1>Страница с отключенными ссылками</h1>
                <p>Большинство ссылок отключены, работают только основные</p>
            </div>
        </div>
    ),
}

// Все состояния вместе
export const AllStates: Story = {
    parameters: {
        pseudo: {
            hover: ['.hover-state'],
        },
    },
    args: {
        mainItems: (
            <>
                <SidebarLinkUI label="Feed" icon="feed" state="default" />
                <SidebarLinkUI label="Create" icon="create" state="hover" />
                <SidebarLinkUI label="My Profile" icon="myProfile" state="active" />
                <SidebarLinkUI label="Messenger" icon="messenger" state="default" />
                <SidebarLinkUI label="Search" icon="search" state="disabled" />
            </>
        ),
        bottomItems: (
            <>
                <SidebarLinkUI label="Statistics" icon="statistic" state="hover" />
                <SidebarLinkUI label="Favorites" icon="favorites" state="disabled" />
            </>
        ),
        onLogout: () => alert('Logout clicked'),
        logoutState: 'hover',
    },
    render: (args) => (
        <div style={{ display: 'flex' }}>
            <SidebarUI {...args} />
            <div style={{ marginLeft: '220px', padding: '20px' }}>
                <h1>Все состояния</h1>
                <p>Демонстрация всех возможных состояний элементов сайдбара</p>
            </div>
        </div>
    ),
}

// Без кнопки выхода
export const WithoutLogout: Story = {
    args: {
        mainItems: DefaultMainItems,
        bottomItems: DefaultBottomItems,
        showLogout: false,
    },
    render: (args) => (
        <div style={{ display: 'flex' }}>
            <SidebarUI {...args} />
            <div style={{ marginLeft: '220px', padding: '20px' }}>
                <h1>Страница без выхода</h1>
                <p>Сайдбар без кнопки выхода (например, для публичных страниц)</p>
            </div>
        </div>
    ),
}
