import {memo, MouseEventHandler} from 'react';
import styles from "./IconButton.module.scss"

type Props = {
    iconId: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    width?: string
    height?: string
    viewBox?: string
    fill?: string
    disabled?: boolean
};

export const IconButton = memo((props: Props) => {
    const sprite = "/icons-sprite.svg"
    const {
        iconId,
        width,
        height,
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
            <svg
                width={width || "24"}
                height={height || "24"}
                viewBox={viewBox || "0 0 24 24"}
                style={{color: fill || "currentColor"}}
            >
                <use xlinkHref={`${sprite}#${iconId}`}/>
            </svg>
        </button>
    );
});