// @ts-ignore
import StatusPointIcon from '../../assets/svg/status-point.svg?react'
import { Status } from '../../assets/types/enum'
import style from './StatusCard.module.scss'
interface IStatusProps {
  statusText: keyof typeof Status
  size?: 'small'
}
const StatusCard: React.FC<IStatusProps> = ({ statusText, size }) => {
  return (
    <div className={`${style['statusCard'] } ${size ? style[`statusCard--${size}`] : ''}`}>
      <div className={style['statusCard__icon']} style={{ color: Status[statusText].color }}>
        <StatusPointIcon />
      </div>
      <p className={style['statusCard__text']}>{Status[statusText].text}</p>
    </div>
  )
}

export default StatusCard