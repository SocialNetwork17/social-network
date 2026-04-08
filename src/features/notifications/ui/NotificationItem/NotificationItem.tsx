// @flow
import * as React from 'react';
import {SchemaNotificationViewDto} from "@/shared/api/schema";

type Props = {
    notification: SchemaNotificationViewDto
};
export const NotificationItem = ({notification}: Props) => {
    const {id, message,isRead, createdAt} = notification
    return (
        <div>
            <p>{id}</p>
            <p>{message}</p>
            <p>{isRead}</p>
            <p>{createdAt}</p>
        </div>
    );
};