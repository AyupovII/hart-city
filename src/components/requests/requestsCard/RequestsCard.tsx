
import Button from '../../../UI/button/Button'
import StatusCard from '../../status/StatusCard'
import style from './RequestsCard.module.scss'
const RequestsCard: React.FC = () => {

  return (
    <div className={style.requestsCard}>
      <div className={style.requestsCard__title}>
        <div className={style.requestsCard__head}>
          <h2>
            Заявка №258
          </h2>
          <Button theme="white" size="middle" className={style.requestsCard__button} download>Скачать PDF</Button>
        </div>
        <StatusCard statusText="IMPLEMENTED" />
      </div>
      <div className={style.requestsCard__content}>
        <div className={style.requestsCard__info}>
          <p>Осталось дней до открепления: </p> <p>14 дней</p>
        </div>
        <div className={style.requestsCard__list}>
          <div className={style.requestsCard__card}>
            <div className={style.requestsCard__header}>
              <p className={style.requestsCard__role}>
                Клиент
              </p>
              <p className={style.requestsCard__name}>
                Бутурамбеков Махмедахмадиниджан Тимерланович
              </p>
            </div>
            <span className={style.requestsCard__line} />
            <div className={style.requestsCard__body}>
              <p className={style.requestsCard__complex}>ЖК «Смуглянка на Ворошилова» </p>
              <p className={style.requestsCard__apartment}>3-комн. квартира, 84,52 м<sup>2</sup></p>
            </div>
          </div>
          {/* /////////////////// */}
          <div className={style.requestsCard__card}>
            <div className={style.requestsCard__header}>
              <p className={style.requestsCard__role}>
                Менеджер
              </p>
              <p className={style.requestsCard__name}>
                Старикова Мария Васильевна
              </p>
            </div>
            <span className={style.requestsCard__line} />
            <div className={style.requestsCard__contacts}>
              <div className={style.requestsCard__contact}>
                <p className={style.requestsCard__label}>Телефон </p>
                <p className={style.requestsCard__value}>+7 347 201-70-63</p>
              </div>
              <div className={style.requestsCard__contact}>
                <p className={style.requestsCard__label}>Телефон </p>
                <p className={style.requestsCard__value}>+7 347 201-70-63</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button theme="white" size="middle" className={style['requestsCard__button-tablet']} download>Скачать PDF</Button>
    </div>
  )
}
export default RequestsCard