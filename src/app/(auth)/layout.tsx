import { ReactNode } from 'react'

export default function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <>
            AuthLayout - без сайдбара, только хэдер
        </>
    )
}