
import { useState } from 'react'
import style from './Accordion.module.scss'
import chevrovIcon from '../../assets/svg/chevron-down-gold.svg'
interface IAccordionProps {
    children: React.ReactNode
    title: string
    open?: boolean
}
const Accordion: React.FC<IAccordionProps> = ({ children, title, open = false }) => {
    const [isOpen, setIsOpen] = useState(open)
    return (
        <div className={`${style.accordion} ${isOpen ? style["accordion--open"] : ""}`} >
            <div className={style.accordion__header} onClick={() => setIsOpen(!isOpen)}>
                <p className={style.accordion__title}>{title}</p>
                <img className={style.accordion__icon} src={chevrovIcon} alt="arrow" />
            </div>
            <div className={style.accordion__content}>
                {children}
            </div>
        </div>
    )

}

export default Accordion