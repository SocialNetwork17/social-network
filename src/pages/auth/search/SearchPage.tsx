"use client";

import {useEffect, useMemo, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import s from "./SearchPage.module.scss";
import {SearchInput} from "@/shared/ui/SearchInput/SearchInput";
import {useSearchUsers} from "@/features/searchUsers/api/useSearchUsers";
import {PATH} from "@/shared/constants/routings";
import {Icon} from "@/shared/ui/Icon/Icon";


export const SearchPage = () => {
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [debouncedQuery, setDebouncedQuery] = useState('')
    const loadMoreRef = useRef<HTMLDivElement | null>(null)

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
    } = useSearchUsers(debouncedQuery)

    const users = useMemo(() => data?.pages.flatMap(page => page.items ?? []) ?? [], [data])

    console.log(users)

    useEffect(() => {
        const target = loadMoreRef.current

        if (!target || !hasNextPage) {
            return
        }

        const observer = new IntersectionObserver(entries => {
            if (entries[0]?.isIntersecting && !isFetchingNextPage) {
                fetchNextPage()
            }
        }, {threshold: 0.5})

        observer.observe(target)

        return () => observer.disconnect()
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])


    return (
        <div className={s.container}>
            <span className={s.title}>Search</span>
            <div className={s.userTop}>
                <SearchInput
                    placeholder={"Search input"}
                    onValueChange={setQuery}
                />
            </div>

            {users.length > 0 ? (
                <>
                    <ul className={s.results}>
                        {users.map(user => {
                            const avatarUrl = user.avatars?.[0]?.url

                            return (
                                <li
                                    key={user.id}
                                    className={s.userItem}
                                    onClick={() => router.push(`${PATH.PROFILE}/${user.id}`)}
                                >
                                    {avatarUrl ? (
                                        <img
                                            src={avatarUrl}
                                            alt={user.userName}
                                            className={s.avatar}
                                        />
                                    ) : (
                                        <Icon iconId={'default-avatar'} size={48} viewBox={'0 0 62 62'}/>
                                    )}
                                    <div className={s.userNameWrapper}>
                                        <span className={s.userName}>{user.userName}</span>
                                        <div className={s.userFirstLastNameWrapper}>
                                            <span className={s.userFirstName}>{user.firstName}</span>
                                            <span className={s.userLastName}>{user.lastName}</span>
                                        </div>
                                    </div>
                                </li>
                            )}
                        )}
                    </ul>
                    <div ref={loadMoreRef} className={s.loadMoreTrigger}/>
                </>
            ) : (
                <div className={s.emptyState}>No users found.</div>
            )}

        </div>
    );
};
