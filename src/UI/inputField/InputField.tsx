
import style from './InputField.module.scss'
import EyeCloseIcon from '../../assets/svg/eye-close.svg'
import EyeOpenIcon from '../../assets/svg/eye-open.svg'
import searchIcon from '../../assets/svg/search.svg'
import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputFieldProps {
    placeholder: string
    type: "text" | "email" | "password" | "tel" | "number" | "search"
    className?: string
    fieldName?: string
    isRequired?: boolean
    register?: UseFormRegisterReturn<string>
    isError?: boolean
    icon?: JSX.Element
    [key: string]: any
}

const InputField: React.FC<InputFieldProps> = ({ className = "", type, placeholder, isError = false, fieldName, register, isRequired, ...props }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const isPassword = type === "password";
    const isSearch = type === "search";
    return (
        <div className={`${className} ${style.inputField} ${isError ? style.inputField__error : ''}`}>
            <input
                type={isPassword ? (hidePassword ? "password" : "text") : isSearch ? "text" : type}
                className={`${style.inputField__input} ${isPassword ? style.inputField__password : ''}`}
                placeholder={placeholder}
                {...props}
                {...register}
            // onClick={onClick}
            />
            {isPassword && <img src={hidePassword ? EyeCloseIcon : EyeOpenIcon} onClick={() => setHidePassword(!hidePassword)} className={style.inputField__icon} />}
            {isSearch && <img src={searchIcon} className={style.inputField__icon} />}
        </div>
    )
}

export default InputField