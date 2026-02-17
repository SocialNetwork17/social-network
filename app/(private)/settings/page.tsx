import { Suspense } from "react"
import { SettingsPage } from "@/pages/settings/ui/SettingsPage"

export default function Settings() {
    return (
        <Suspense fallback={null}>
            <SettingsPage />
        </Suspense>
    )
}