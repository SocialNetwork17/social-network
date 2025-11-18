import {memo, MouseEventHandler} from 'react';
import styles from "./IconButton.module.scss"
import {Icon} from "@/shared/ui/Icon/Icon";

type Props = {
    iconId: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    size?: number
    viewBox?: string
    fill?: string
    disabled?: boolean
};

export const IconButton = memo((props: Props) => {
    const sprite = "/icons-sprite.svg"
    const {
        iconId,
        size,
        viewBox,
        fill,
        disabled,
        onClick,
    } = props

    return (
        <button
            className={`${styles.iconButton} ${disabled ? styles.iconButtonDisabled : ""}`}
            onClick={onClick}
            type="button"
            disabled={disabled}
        >
            <Icon iconId={iconId} size={size}/>
            <svg
                viewBox={viewBox || "0 0 24 24"}
                style={{color: fill || "currentColor"}}
            >
                <use xlinkHref={`${sprite}#${iconId}`}/>
            </svg>
        </button>
    );
});