"use client"
import * as React from 'react';
import {useAuth} from "@/shared/hooks/useAuth";
import {useRouter} from "next/navigation";
import {PATH} from "@/shared/constants/routings";
import {useEffect} from "react";

type Props = {
    children: React.ReactNode;
};
export default function AuthLayout ({children}: Props) {
    const router = useRouter()

    const {isAuth, isLoading} = useAuth()

    useEffect(() => {
        if(isAuth) {
            router.push(PATH.MAIN)
        }
    }, [isAuth, isLoading])



    return (
        <>
            {children}
        </>
    );
};