import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {BaseSnackbar} from "@/widgets/snackbar/ui/baseSnackbar/BaseSnackbar";

const meta = {
  title: 'widgets/snackbar/BaseSnackbar',
  component: BaseSnackbar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BaseSnackbar>

export default meta

type Story = StoryObj<typeof BaseSnackbar>

 export const Error: Story = {
   // args: {
   //   success,
   //   mess
   // },
 }

 export const Success: Story = {
   // args: {
   //   type: "success",
   //     message: 'Your settings are saved',
   // },
 }
