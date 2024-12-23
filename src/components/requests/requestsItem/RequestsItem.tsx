
import style from './RequestsItem.module.scss'
// @ts-ignore
import StatusPointIcon from '../../../assets/svg/status-point.svg?react'
import { Status } from '../../../assets/types/enum'
export interface IRequestProps {
    id: number,
    title: string,
    description: string,
    fio: string,
}
const RequestsItem: React.FC<IRequestProps> = ({ title, description, fio }) => {
    return (
        <div className={style.requestsItem}>
            <div className={style.requestsItem__status}>
                <div className={style['requestsItem__status-type']}>
                    <div className={style['requestsItem__status-icon']} style={{ color: Status.FIXATION_HAS_EXPIRED.color }}>
                        <StatusPointIcon />
                    </div>
                    <p className={style['requestsItem__status-text']}>Не реализована</p>
                </div>
                <p className={style['requestsItem__status-date']}>
                    Осталось дней: {"14"}
                </p>
            </div>
            <div className={style.requestsItem__content}>
                <div className={style.requestsItem__info}>
                    <p className={style.requestsItem__name}>
                        {title}
                    </p>
                    <p className={style.requestsItem__description}>
                        {description}
                    </p>
                </div>
                <div className={style.requestsItem__fio}>

                    <p className={style['requestsItem__fio-value']}>
                        {fio}
                    </p>
                    <p className={style['requestsItem__fio-text']}>
                        Фамилия Имя Отчество
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RequestsItem