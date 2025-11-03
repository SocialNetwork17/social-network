import {memo, MouseEventHandler} from 'react';
import styles from "./IconButton.module.scss"

type Props = {
    iconId: string
    width: string
    height: string
    viewBox: string
    fill?: string
    onClick: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
};

export const IconButton = memo((props: Props) => {

    const {
        iconId,
        width,
        height,
        viewBox,
        fill,
        disabled,
        onClick
    } = props

    return (
        <button
            className={`${styles.iconButton} ${disabled ? styles.iconButtonDisabled : ""}`}
            onClick={onClick}
            type="button"
            disabled={disabled}
        >
            <svg width={width} height={height} viewBox={viewBox} fill={fill || "none"}>
                <use xlinkHref={iconId}/>
            </svg>
        </button>
    );
});