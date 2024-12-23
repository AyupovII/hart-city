import { UseFormRegisterReturn } from 'react-hook-form'
import style from './CheckBox.module.scss'

interface ICheckBoxProps {
    label: string
    className?: string
    register?: UseFormRegisterReturn<string>
    isError?: boolean
    color?: string
    size?: string
    
}
const CheckBox: React.FC<ICheckBoxProps> = ({ label, className, register, isError, color, size }) => {
    return (
        <label className={`${style.checkbox} ${className} ${color && style[`checkbox_${color}`]} ${isError ? style.checkbox__error : ''}`} >
            <input type="checkbox" {...register}/>
            <span className={style.checkbox__label}>{label}</span>
            <span className={`${style.custom_checkbox  } ${size ? style[`size_${size}`] : ''}`}></span>
        </label>
    )
}

export default CheckBox