import React, { useState, useEffect } from 'react';
import { Button } from '@/shared/ui/Button/Button'
import {Icon} from "@/shared/ui/Icon/Icon";

export const ThemeSwitcher = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        document.documentElement.classList.toggle('light', theme === 'light');
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <>
            {theme === 'light' ? (
                <Button variant={'textButton'} disabled={false} width={36} height={36} onClick={toggleTheme} >
                    <Icon iconId={'moon'} size={20} stroke={'black'}/>
                </Button>
            ) : (
                <Button variant={'textButton'} disabled={false} width={36} height={36} onClick={toggleTheme} >
                    <Icon iconId={'sun'} size={20} stroke={'white'}/>
                </Button>
            )}
        </>
    );
};
