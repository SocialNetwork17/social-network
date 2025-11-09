import React, {useEffect, useRef, useState} from 'react';
import s from './Select.module.css';
import {Icon} from "@/shared/ui/Icon/Icon";

export type Option = { id: string, label: string }

type SelectBoxProps = {
    options: Option[];
    onChange: (option: Option) => void;
    placeholder?: string;
    disabled?: boolean;
    classContainer?: string;
    classBox?: string;
    classArrow?: string;
    classOption?: string;
    styleContainer?: React.CSSProperties;
    styleBox?: React.CSSProperties;
    styleArrow?: React.CSSProperties;
    styleOption?: React.CSSProperties;
};

const SelectBox = ({
                       options = [],
                       onChange,
                       placeholder = "Select an option",
                       disabled = false,
                       classContainer = "",
                       classBox = "",
                       classArrow = "",
                       classOption = "",
                       styleContainer,
                       styleBox,
                       styleArrow,
                       styleOption
                   }: SelectBoxProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
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
        setSelectedOption(option.label);
    };

    return (
        <div className={`${s.selectContainer} ${classContainer}`}
             tabIndex={0}
             ref={selectRef}
             style={styleContainer}
        >
            <div
                className={`${s.selectBox} ${classBox} ${isOpen ? s.open : ''} ${isHovered ? 'hovered' : ''} ${disabled ? s.disabled : ''}`}
                style={styleBox}
                onMouseEnter={() => !disabled && setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <span className={s.selectValue}>
                  {selectedOption ? selectedOption : placeholder}
                </span>
                <div className={s.selectArrow + ' ' + classArrow}
                     style={styleArrow}
                >
                    <Icon iconId={'arrow-down'} size={24} />
                </div>
            </div>

            {isOpen && (
                <div className={s.selectDropdown}>
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={`${s.selectOption} ${classOption} ${selectedOption === option.id ? 'selected' : ''}`}
                            style={styleOption}
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