import style from './Banner.module.scss'
import BannerImg from '../../assets/img/banner-background.png'
import BannerFoneImg from '../../assets/img/banner-fon.png'

const Banner: React.FC = () => {
    return (
        <section>
            <div className={style.banner} >
                <div className={style.banner__content}>
                    <h1 className={style.banner__title}>Кабинет агента <br />
                        «HART»</h1>
                    <p className={style.banner__description}>Рыбатекст используется дизайнерами, проектировщиками и фронтендерами,
                        когда нужно быстро заполнить макеты или прототипы содержимым. Это тестовый контент, который не должен нести никакого смысла, лишь показать наличие самого текста
                        или продемонстрировать типографику в деле.</p>
                </div>
                <img src={BannerImg} loading="eager" alt="BannerImg" className={style.banner__img} />
                <img src={BannerFoneImg} loading="eager" alt="BannerFoneImg" className={style["banner__fone-img"]} />

            </div>
        </section>
    )
}

export default Banner