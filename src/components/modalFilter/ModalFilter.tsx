import style from './ModalFilter.module.scss'

interface IModalFilterProps {
    children?: React.ReactNode
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
}
const ModalFilter: React.FC<IModalFilterProps> = ({ children, isOpenModal }) => {
    return (
        <div className={`${style.modalFilter} ${isOpenModal ? style['modalFilter--active'] : ''}`}>
            <div className={style.modalFilter__content}>
                {children}
            </div>
        </div>
    )
}

export default ModalFilter