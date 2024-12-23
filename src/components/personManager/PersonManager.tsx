import style from './PersonManager.module.scss'
// @ts-ignore
import LogoDevelopment from '../../assets/svg/logo-development.svg?react'
import profileImage from '../../assets/img/profile.png'

const PersonManager: React.FC = () => {
    return (
        <section>
            <div className={style.personManager}>
                <h2 className={style.personManager__title}>Ваш персональный менеджер</h2>
                <div className={style.personManager__content}>
                    <img className={style.personManager__photo} src={profileImage} alt="photo" />
                    <div className={style.personManager__info}>
                        <p className={style.personManager__name}>Старикова Мария Васильевна</p>
                        <div className={style.personManager__contacts}>
                            <a href="tel:+7347201-70-63" className={style.personManager__phone}><p className={style.personManager__phone}>+7 347 201-70-63</p></a>
                            <a href="mailto:info@anzs.ru" className={style.personManager__email}><p className={style.personManager__email}>info@anzs.ru</p></a>
                        </div>
                    </div>
                </div>
                <LogoDevelopment className={style.personManager__logo} />
            </div>
        </section>
    )
}

export default PersonManager