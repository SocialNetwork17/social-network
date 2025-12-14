"use client"
import * as React from 'react';
import {useAuth} from "@/shared/hooks/useAuth";
import {useRouter} from "next/navigation";
import {PATH} from "@/shared/constants/routings";
import {useEffect} from "react";
import {Loader} from "@/shared/ui/Loader/Loader";

type Props = {
    children: React.ReactNode;
};
export default function AuthLayout ({children}: Props) {
    const router = useRouter()

    const {isAuth, isLoading} = useAuth()

    useEffect(() => {
        if (!isLoading && isAuth) {
            router.replace(PATH.MAIN)
        }
    }, [isAuth, isLoading])

    if (isLoading || isAuth) return <Loader/>

    return (
        <>
            {children}
        </>
    );
};