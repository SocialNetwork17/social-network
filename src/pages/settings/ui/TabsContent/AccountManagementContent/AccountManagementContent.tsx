import styles from "./AccountManagementContent.module.scss"

import {RadioGroup} from "@/shared/ui/Radio/RadioGroup";
import {useState} from "react";
import {IconButton} from "@/shared/ui/IconButton/IconButton";

export const AccountManagementContent = () => {
    const [accountType, setAccountType] = useState('personal')
    const [costsValue, setCostsValue] = useState('oneDay')

    return (
        <div className={styles.accountManagementContainer}>
            <div className={styles.accountManagementBlock}>
                <h4 className={styles.accountManagementTitle}>Account type:</h4>
                <div className={styles.radioGroupContainer}>
                    <RadioGroup
                        name="tariff"
                        options={[
                            { value: 'personal', label: 'Personal'},
                            { value: 'business', label: 'Business' },
                        ]}
                        value={accountType}
                        onChange={setAccountType}
                    />
                </div>
            </div>
            {accountType ===  'business' &&
            <div className={styles.accountManagementBlock}>
                <h4 className={styles.accountManagementTitle}>Your subscription costs:</h4>
                <div className={styles.radioGroupContainer}>
                    <RadioGroup
                        name="costs"
                        options={[
                            { value: 'oneDay', label: '$10 per 1 Day'},
                            { value: 'sevenDay', label: '$50 per 7 Day' },
                            { value: 'month', label: '$100 per month'},
                        ]}
                        value={costsValue}
                        onChange={setCostsValue}
                    />
                </div>
                <div className={styles.paymentBlock}>
                    <IconButton iconId={'paypal'}
                                size={96}
                                viewBox={'0 0 96 64'}
                    />
                    <span className={styles.paymentBlock}>or</span>
                    <IconButton iconId={'stripe'}
                                size={96}
                                viewBox={'0 0 96 64'}
                    />
                </div>
            </div>
            }
        </div>
    )
}