import styles from './Blocks.module.scss'
import icon1 from '../../assets/svg/icon1.svg'
import icon2 from '../../assets/svg/icon2.svg'
import icon3 from '../../assets/svg/icon3.svg'
import icon4 from '../../assets/svg/icon4.svg'

const Blocks: React.FC = () => {
  return (
    <div className={styles.blocks}>
      <div className={styles.blocks__item}>
        <img className={styles.item__icon} src={icon1} alt="icon1" />
        <div className={styles.item__content}>
          <p className={styles.item__title}>20+ объектов</p>
          <p className={styles.item__description}>Разной сложности</p>
        </div>
      </div>
      <div className={styles.blocks__item}>
        <img className={styles.item__icon} src={icon2} alt="icon1" />
        <div className={styles.item__content}>
          <p className={styles.item__title}>25 лет на рынке</p>
          <p className={styles.item__description}>Большой опыт работы</p>
        </div>
      </div>
      <div className={styles.blocks__item}>
        <img className={styles.item__icon} src={icon3} alt="icon1" />
        <div className={styles.item__content}>
          <p className={styles.item__title}>100%</p>
          <p className={styles.item__description}>Собственный капитал</p>
        </div>
      </div>
      <div className={styles.blocks__item}>
        <img className={styles.item__icon} src={icon4} alt="icon1" />
        <div className={styles.item__content}>
          <p className={styles.item__title}>{'>'}  {(350000).toLocaleString('ru-RU')} м²</p>
          <p className={styles.item__description}>Построено</p>
        </div>
      </div>
    </div>
  )
}

export default Blocks