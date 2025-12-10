import { StoryObj, Meta } from '@storybook/nextjs-vite'

const Scrollbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        overflow: 'auto',
        height: '100%',
        width: '100%',
        scrollbarWidth: 'thin',
        scrollbarColor: '#333 transparent',
      }}
    >
      {children}
    </div>
  )
}

const meta = {
  title: 'Components/Scrollbar',
  component: Scrollbar,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Scrollbar>

export default meta
type Story = StoryObj<typeof meta>

// Контент для демонстрации
const LongContent = () => (
  <div style={{ padding: '20px', color: 'white' }}>
    <h2>Прокручиваемый контент</h2>
    {Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        style={{
          padding: '10px',
          margin: '5px 0',
          backgroundColor: '#333',
          borderRadius: '4px',
          color: 'white',
        }}
      >
        Элемент {i + 1}
      </div>
    ))}
  </div>
)

export const Default: Story = {
  args: {
    children: <LongContent />,
  },
  render: args => (
    <div style={{ height: '300px', backgroundColor: '#000000' }}>
      <Scrollbar {...args} />
    </div>
  ),
}

export const HorizontalScroll: Story = {
  args: {
    children: (
      <div style={{ padding: '20px', whiteSpace: 'nowrap', color: 'white' }}>
        <h2>Широкий контент</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              style={{
                minWidth: '150px',
                padding: '20px',
                backgroundColor: '#333',
                borderRadius: '4px',
                color: 'white',
              }}
            >
              Блок {i + 1}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  render: args => (
    <div style={{ height: '200px', backgroundColor: '#000000' }}>
      <Scrollbar {...args} />
    </div>
  ),
}
