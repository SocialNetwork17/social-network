'use client'
import s from './SuperCheckboxDemo.module.css'
import SuperCheckboxSprite from '../SuperCheckbox';
import React, {useState} from "react";


const SuperCheckboxDemo = () => {
    // Individual states for each checkbox
    const [checkbox1, setCheckbox1] = useState<boolean>(true)
    const [checkbox2, setCheckbox2] = useState<boolean>(false)
    const [checkbox3, setCheckbox3] = useState<boolean>(false)
    const [checkbox4, setCheckbox4] = useState<boolean>(false)
    const [checkbox5, setCheckbox5] = useState<boolean>(false)

    return (
        <div id={'SuperCheckboxDemo'} className={s.stand}>
            <div className={s.checkboxes}>



                {/* Checkbox 1: disabled and checked */}
                <div >
                    <SuperCheckboxSprite
                        disabled
                        id={'checkbox-1'}
                        checked={checkbox1}
                        onChangeChecked={setCheckbox1}
                    >
                        Первый чекбокс
                    </SuperCheckboxSprite>
                </div>

                {/* Checkbox 2 */}
                <div>
                    <SuperCheckboxSprite
                        id={'checkbox-2'}
                        checked={checkbox2}
                        onChangeChecked={setCheckbox2}
                    >
                        Второй чекбокс
                    </SuperCheckboxSprite>
                </div>

                {/* Checkbox 3 */}
                <div>
                    <SuperCheckboxSprite
                        id={'checkbox-3'}
                        checked={checkbox3}
                        onChangeChecked={setCheckbox3}
                    >
                        Третий чекбокс
                    </SuperCheckboxSprite>
                </div>

                {/* Checkbox 4 */}
                <div>
                    <SuperCheckboxSprite
                        id={'checkbox-4'}
                        checked={checkbox4}
                        onChangeChecked={setCheckbox4}
                    >
                        Четвертый чекбокс
                    </SuperCheckboxSprite>
                </div>

                {/* Checkbox 5: disabled */}
                <div>
                    <SuperCheckboxSprite
                        disabled
                        id={'checkbox-5'}
                        checked={checkbox5}
                        onChangeChecked={setCheckbox5}
                    />
                </div>
            </div>
        </div>
    )
}

export default SuperCheckboxDemo;