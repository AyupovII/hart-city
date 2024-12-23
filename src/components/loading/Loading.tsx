import { useEffect, useState } from "react"
import style from './Loading.module.scss'
// @ts-ignore
import Loader from '../../assets/svg/menu-icon.svg?react'
// @ts-ignore
import Preloader from '../../assets/svg/menu-icon.svg?react'

const Loading: React.FC = () => {
    const [tick, setTick] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setTick(prev => prev + 1)
        }, 5)
        if (tick >= 100) clearInterval(interval)
        return () => clearInterval(interval)
    })
    return (
        <div className={style.loading}>
            <span>1111</span>
            <Loader className={style.loading__loader} />
            <Preloader className={style.loading__preloader} style={{ clipPath: `inset(${100 - tick}% 0 0 0)` }} />
        </div>
    )
}

export default Loading