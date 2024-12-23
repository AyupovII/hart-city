import style from './Button.module.scss'
// @ts-ignore
import DownloadIcon from '../../assets/svg/download.svg?react'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type?: "button" | "submit" | "reset"
    theme: "white" | "blue" | "blur" | "gray" | "blur10" | "grayLight" | "darkGray"
    size: "large" | "medium" | "long" | "middle"
    fullWidth?: boolean
    className?: string
    children?: React.ReactNode
    download?: boolean
}

const Button: React.FC<ButtonProps> = ({ size, theme, type = "button", fullWidth, children, download = false, ...props }) => {
    return (
        <button
            {...props}
            type={type}
            data-theme={theme}
            className={
                `${props.className} ${style.button} ${style[`button_${size}` as keyof typeof style]} ${fullWidth ? style.button_fullWidth : ''} ${download ? style.button_download : ''}`}
        >
            {download && <DownloadIcon className={style.downloadIcon} />}
            <span className={style.children}>{children}</span>
        </button>
    )
}
export default Button