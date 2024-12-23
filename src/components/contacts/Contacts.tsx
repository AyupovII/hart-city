import style from './Contacts.module.scss'
const Contacts: React.FC = () => {
    return (
        <div className={style.contacts__wrapper}>
            <h2 className={style["contacts__head-title"]}>Контакты</h2>
            <div className={style.contacts}>
                <div className={style.contacts__content}>
                    <div className={style.contacts__info}>
                        <div className={style.contacts__head}>
                            <p className={style.contacts__title}>Главный офис АРТ–СИТИ</p>
                            <p className={style.contacts__subtitle}>info@anzs.ru</p>
                        </div>
                        <span className={style.contacts__separator} />
                        <div className={style.contacts__body}>
                            <div className={style.contacts__item}>
                                <p className={style.contacts__label}>Адрес офиса:</p>
                                <div className={style.contacts__address}>
                                    <p className={style.contacts__text}>Санкт-Петербург, улица Марата, 75</p>
                                    <p className={style.contacts__link}>Проложить маршрут</p>
                                </div>
                            </div>
                            <div className={style.contacts__item}>
                                <p className={style.contacts__label}>Режим работы</p>
                                <p className={style.contacts__text}>
                                    Будни: 10:00 - 20:00<br />
                                    Суббота, Воскресенье: 10:00 - 18:00
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={style.contacts__info}>
                        <div className={style.contacts__head}>
                            <p className={style.contacts__title}>Отдел продаж</p>
                            <p className={style.contacts__subtitle}>8 (812) 640-18-54</p>
                        </div>
                        <span className={style.contacts__separator} />
                        <div className={style.contacts__body}>
                            <div className={style.contacts__item}>
                                <p className={style.contacts__label}>Адрес офиса:</p>
                                <div className={style.contacts__address}>
                                    <p className={style.contacts__text}>Санкт-Петербург, улица Марата, 75</p>
                                    <p className={style.contacts__link}>Проложить маршрут</p>
                                </div>
                            </div>
                            <div className={style.contacts__item}>
                                <p className={style.contacts__label}>Режим работы</p>
                                <p className={style.contacts__text}>
                                    Будни: 10:00 - 20:00<br />
                                    Суббота, Воскресенье: 10:00 - 16:00
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Contacts