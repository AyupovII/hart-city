import { BASE_URL } from '../../../constants/url'
import { PlansContentType } from '../plansContent/PlansContent'
import style from './PlansCard.module.scss'

const PlansCard: React.FC<PlansContentType & { isTableType?: boolean, onClick?: () => void }> = ({ id, rooms, title, area, floor, picture, price, isTableType = true, onClick }) => {
  return (
    <div className={style["planingCard-wrapper"]} onClick={onClick}>
      {isTableType ?
        <div className={`${style.plansCard}`}>
          <div className={style.plansCard__content}>
            <p className={style.plansCard__title}>{title}</p>
            <img className={style.plansCard__image} src={`${BASE_URL}/${picture}`} alt="objectImg" />
            <div className={style.plansCard__common}>
              <p className={style.plansCard__chip}>Улучшенная отделка {id}</p>
              <div className={style.plansCard__info}>
                <p className={style.plansCard__columnRoom}>{rooms}-комн.</p>
                <span></span>
                <p className={style.plansCard__area}>{area} м<sup>2</sup></p>
                <span></span>
                <p className={style.plansCard__floor}>{floor}/9</p>
              </div>
            </div>
          </div>
          <div className={style.plansCard__prices}>
            <p className={style.plansCard__price}>от {price.toLocaleString('ru-RU')}&nbsp;₽</p>
            <p className={style.plansCard__credit}>В ипотеку от 10 063&nbsp;₽/мес.</p>
          </div>
        </div>
        :
        <div className={`${style["plansCard-list"]}`}>
          <div className={style['plansCard-common']}>
            <img className={style.plansCard__image} src={`${BASE_URL}/${picture}`} alt="objectImg" />
            <div className={style.plansCard__content}>
              <p className={style.plansCard__title}>{title}</p>
              <div className={style.plansCard__common}>
                <p className={style.plansCard__chip}>Улучшенная отделка</p>
                <div className={style.plansCard__info}>
                  <p className={style.plansCard__columnRoom}>{rooms}-комн.</p>
                  <span></span>
                  <p className={style.plansCard__area}>{area} м<sup>2</sup></p>
                  <span></span>
                  <p className={style.plansCard__floor}>{floor}/9</p>
                </div>
              </div>
            </div>
          </div>
          <div className={style.plansCard__prices}>
            <p className={style.plansCard__price}>от {price.toLocaleString('ru-RU')} ₽</p>
            <p className={style.plansCard__credit}>В ипотеку от 10 063&nbsp;₽/мес.</p>
          </div>
        </div>}
    </div>

  )
}

export default PlansCard
