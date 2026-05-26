"use client";

import {useEffect, useMemo, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import s from "./SearchPage.module.scss";
import {SearchInput} from "@/shared/ui/SearchInput/SearchInput";
import {useSearchUsers} from "@/shared/api/useSearchUsers";
import {PATH} from "@/shared/constants/routings";
import {Icon} from "@/shared/ui/Icon/Icon";
import {Spinner} from "@/shared/ui/Spinner/Spinner";
import {Loader} from "@/shared/ui/Loader/Loader";
import * as React from "react";


export const SearchPage = () => {
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [debouncedQuery, setDebouncedQuery] = useState('')
    const loadMoreRef = useRef<HTMLDivElement | null>(null)
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query.trim())
        }, 500)

        return () => clearTimeout(timer)
    }, [query])

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useSearchUsers(debouncedQuery)

    const users = useMemo(() => data?.pages.flatMap(page => page.items ?? []) ?? [], [data])

    useEffect(() => {
        const target = loadMoreRef.current
        const container = scrollContainerRef.current

        if (!target || !hasNextPage) {
            return
        }

        const observer = new IntersectionObserver(entries => {
            if (entries[0]?.isIntersecting && !isFetchingNextPage) {
                fetchNextPage()
            }
        }, {threshold: 0.5, root: container})

        observer.observe(target)

        return () => observer.disconnect()
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])


    return (
        <div className={s.container}>
            <div className={s.headerSection}>
                <h1 className={s.title}>Search</h1>
                <SearchInput
                    placeholder={"Search input"}
                    onValueChange={setQuery}
                />
                <h2 className={s.subTitle}>Recent requests</h2>
            </div>

            {isLoading && users.length === 0 ?
                (<div>
                    <Loader/>
                </div>) :
                (<div ref={scrollContainerRef} className={s.scrollableContent}>
                    {users.length > 0 ? (
                        <>
                            <ul className={s.results}>
                                {users.map(user => {
                                    const avatarUrl = user.avatars?.[0]?.url

                                    return (
                                        <li key={user.id} className={s.userItem}>
                                            <div className={s.userContent}>
                                                {avatarUrl ? (
                                                    <img
                                                        src={avatarUrl}
                                                        alt={user.userName}
                                                        className={s.avatar}
                                                    />
                                                ) : (
                                                    <Icon iconId={'default-avatar'} size={48} viewBox={'0 0 62 62'}/>
                                                )}
                                                <div
                                                    className={s.userNameWrapper}
                                                    onClick={() => router.push(`${PATH.PROFILE}/${user.id}`)}>
                                                    <span className={s.userName}>{user.userName}</span>
                                                    <span className={s.userFirstLastName}>{`${user.firstName ?? ''} ${user.lastName ?? ''}`}</span>
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                )}
                            </ul>
                            <div ref={loadMoreRef} className={s.loadMoreTrigger}/>
                        </>
                    ) : (
                        <div className={s.emptyState}>No users found</div>
                    )}
                </div>)
            }
            {isFetchingNextPage && (
                <div className={s.spinner}>
                    <Spinner/>
                </div>
            )}
        </div>
    );
};
