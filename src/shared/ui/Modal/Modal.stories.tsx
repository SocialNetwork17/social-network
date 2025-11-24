
import { Modal } from './Modal';
import {Meta, StoryObj} from "@storybook/nextjs-vite";
import {fn} from "storybook/test";
import {useState} from "react";


const meta = {
    title: 'Shared/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Универсальное модальное окно с поддержкой закрытия по клику на бэкдроп и клавише Escape.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        isOpen: {
            control: 'boolean',
            description: 'Состояние модального окна (открыто/закрыто)',
        },
        onClose: {
            action: 'closed',
            description: 'Функция закрытия модального окна',
        },
        title: {
            control: 'text',
            description: 'Заголовок модального окна',
        },
        children: {
            control: false,
            description: 'Контент модального окна',
        },
    },
    args: {
        onClose: fn(),
    },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Базовый пример
export const Default: Story = {
    args: {
        isOpen: true,
        title: 'Базовое модальное окно',
        children: (
            <div>
                <p>Это базовое модальное окно с простым текстовым содержимым.</p>
            <p>Можно разместить любой React-компонент в качестве контента.</p>
            </div>
),
},
};


// Интерактивный пример
export const InteractiveExample = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ textAlign: 'center' }}>
            <button onClick={() => setIsOpen(true)}>
                Открыть модальное окно
            </button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Интерактивный пример"
            >
                <div>
                    <p>Это интерактивный пример модального окна!</p>
                    <p>Вы можете закрыть его:</p>
                    <ul style={{ textAlign: 'left', marginBottom: '20px' }}>
                        <li>Кликнув на крестик в правом верхнем углу</li>
                        <li>Кликнув на затемненную область вокруг модалки</li>
                        <li>Нажав клавишу Escape</li>
                    </ul>
                    <button onClick={() => setIsOpen(false)}>
                        Закрыть модалку
                    </button>
                </div>
            </Modal>
        </div>
    );
};
