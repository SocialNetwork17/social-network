import styles from "@/pages/settings/ui/TabsContent/AccountManagementContent/ui/AccountTypeSection/AccountTypeSection.module.scss";
import {RadioGroup} from "@/shared/ui/Radio/RadioGroup";
import * as React from "react";
import {useSubscriptions} from "@/features/subscriptions/hooks/useSubscriptions";

type Props = {
    accountType: 'personal' | 'business',
    setAccountType: (value: 'personal' | 'business') => void
}

export const AccountTypeSection = ({accountType, setAccountType}: Props) => {

    const {isBusinessAccount} = useSubscriptions()

    return (
        <div className={styles.block}>
            <h4 className={styles.title}>Account type:</h4>
            <div className={styles.content}>
                <RadioGroup
                    name="tariff"
                    options={[
                        { value: 'personal', label: 'Personal', disabled: isBusinessAccount},
                        { value: 'business', label: 'Business'},
                    ]}
                    value={accountType}
                    onChange={(value) => setAccountType(value as 'personal' | 'business')}
                />
            </div>
        </div>
    )
}