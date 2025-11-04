import React, {useEffect, useRef, useState} from 'react';
import s from './Select.module.css';
import {Icon} from "@/shared/ui/Icon/Icon";

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
        <div className={`${s.selectContainer} ${className}`} tabIndex={0} ref={selectRef}>
            <div
                className={`${s.selectBox} ${isOpen ? s.open : ''} ${isHovered ? 'hovered' : ''} ${disabled ? s.disabled : ''}`}
                onMouseEnter={() => !disabled && setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <span className={s.selectValue}>
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
                <div className={s.selectArrow}>
                    <Icon iconId={'arrow-down'} size={24} fill={'inherit'}/>
                </div>
            </div>

            {isOpen && (
                <div className={s.selectDropdown}>
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={`${s.selectOption} ${value === option.id ? 'selected' : ''}`}
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