'use client'

import { useQuery } from "@tanstack/react-query";
import styles from "../../rootLayout.module.scss";
import { client } from "@/shared/api/client";

export default function Home() {

    // const query = useQuery({
    //     queryKey:['profile'],
    //     queryFn: async()=>{
    //         const res = await client.GET('/api/v1/users/profile')
    //         alert(res.data)
    //     }
    // })

    return (
        <div className={styles.page}>

            profile
        </div>
    );
}
