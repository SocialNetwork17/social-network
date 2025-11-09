import React from 'react';
import {Button} from "@/shared/ui/button/Button";
import scss from './HeaderMenu.module.scss'
import SelectBox from "@/shared/ui/select-box/SelectBox";
import {IconButton} from "@/shared/ui/IconButton/IconButton";

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

    const languages = [
        {id: "1", label: "Russian"},
        {id: "2", label: "English"}
    ]

    return (
        <div className={`${scss.menuBox}`}>
            {isLoggedIn
                ?
                (
                    <>
                       <div className={scss.iconBox}>
                           <IconButton
                               onClick={onClickHandler}
                               iconId={"messageBell"}
                               height={"20px"}
                               width={"18px"}
                               viewBox={"0 0 18 20"}
                               fill={"red"}
                           />
                           {!!countMessage && <p className={scss.counterMessage}>{countMessage}</p>}
                       </div>
                        <SelectBox options={languages} value={languages[0].label} onChange={()=>{}}></SelectBox>
                    </>
                )
                :
                (
                    <>
                        <SelectBox options={languages} value={languages[0].label} onChange={()=>{}}></SelectBox>
                        <div className={`${scss.buttonsBox}`}>
                            <Button variant={"textButton"} disabled={false} width={100} height={36}>Log in</Button>
                            <Button variant={"primary"} disabled={false} width={100} height={36}>Sing up</Button>
                        </div>
                    </>
                )
            }
        </div>
    );
};
