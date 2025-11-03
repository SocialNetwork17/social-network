import React from 'react';
import scss from './MessageBell.module.scss'

type MessageBell = {
    countMessage: number
    onClickHandler: () => void
}

export const MessageBell = ({countMessage, onClickHandler} : MessageBell) => {

    return (
        <button
            className={scss.iconButton}
            onClick={onClickHandler}
        >
            <svg
                className={scss.icon}
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="red"
                xmlns="http://www.w3.org/2000/svg"
            >
                <use xlinkHref="icons-sprite.svg#messageBell"/>
            </svg>

            {!!countMessage && <p className={scss.counterMessage}>{countMessage}</p>}

        </button>

    );
};

