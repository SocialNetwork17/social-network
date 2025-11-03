import React from 'react';
import {Button} from "@/shared/ui/button/Button";
import scss from './HeaderMenu.module.scss'
import {MessageBell} from "./messageBell/MessageBell";

type HeaderMenu = {
    isLoggedIn: boolean;
    countMessage: number;
    onClickHandler: () => void;
}


export const HeaderMenu = (props: HeaderMenu) => {

    const {
        isLoggedIn,
        countMessage,
        onClickHandler,
    } = props;

    return (
        <div className={`${scss.menuBox}`}>
            {isLoggedIn
                ?
                (
                    <>
                        <MessageBell countMessage={countMessage} onClickHandler={onClickHandler} />

                        <select>
                            <option>rus</option>
                            <option>eng</option>
                        </select>
                    </>
                )
                :
                (
                    <>
                        <select>
                            <option>rus</option>
                            <option>eng</option>
                        </select>

                        <div className={`${scss.buttonsBox}`}>
                            <Button theme={"textButton"} disabled={false} width={100} height={36}>Log in</Button>
                            <Button theme={"primary"} disabled={false} width={100} height={36}>Sing up</Button>
                        </div>
                    </>
                )
            }
        </div>
    );
};
