import React, {useEffect, useRef, useState} from 'react';
import styles from './Select.module.css';
import {Icon} from "@/common/components/icon/Icon";

export type Option = {id: string, label: string}

type SelectBoxProps = {
    options: Option[];
    value: string | null;
    onChange: (option: Option) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
};

const SelectBox = ({
                       options = [],
                       value,
                       onChange,
                       placeholder = "Select an option",
                       disabled = false,
                       className = ""
                   }: SelectBoxProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const selectRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
           if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
               setIsOpen(false);
           }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option: Option) => {
        onChange(option);
        setIsOpen(false);
    };

    const selectedOption = options.find(opt => opt.id === value);

    return (
        <div className={`${styles.selectContainer} ${className}`} tabIndex={0} ref={selectRef}>
            <div
                className={`${styles.selectBox} ${isOpen ? styles.open : ''} ${isHovered ? 'hovered' : ''} ${disabled ? styles.disabled : ''}`}
                onMouseEnter={() => !disabled && setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <span className={styles.selectValue}>
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
                <div className={styles.selectArrow}>
                    <Icon iconId={'arrow-down'} width={'24px'} height={'24px'} fill={'inherit'} viewBox={'0 0 24 24'} stroke={'none'}/>
                </div>
            </div>

            {isOpen && (
                <div className={styles.selectDropdown}>
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={`${styles.selectOption} ${value === option.id ? 'selected' : ''}`}
                            onClick={() => handleSelect(option)}
                            onMouseEnter={(e) => e.currentTarget.classList.add('hovered')}
                            onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectBox;