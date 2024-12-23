import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react'
import style from './ApartmentSliders.module.scss'
import { Navigation, Autoplay, Thumbs, FreeMode, EffectCoverflow } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/thumbs';
import pictureFromWindowImg from '../../assets/img/picture-from-window.png'
import planImg from '../../assets/img/plan.png'
import ButtonArrow from '../../UI/buttonArrow/ButtonArrow';
import { useState } from 'react';
import genplanIcon from '../../assets/svg/thumb-genplan.svg'
import watchWindowIcon from '../../assets/svg/thumb-watch-window.svg'
import stageIcon from '../../assets/svg/thumb-stage.svg'
import planIcon from '../../assets/svg/thumb-plan.svg'
const ApartmentSliders: React.FC = () => {
    const [activeThumb, setActiveThumb] = useState<SwiperClass>();
    return (
        <div className={`${style.apartmentSliders} apartmentSliders`}>
            <ButtonArrow className="swiper-button-prev" size='medium' direction='left' theme='light' />
            <div className={style.apartmentSliders__wrapper}>
                <Swiper
                    className={style.apartmentSliders__swiper}
                    modules={[Navigation, Autoplay, Thumbs, FreeMode, EffectCoverflow]}
                    spaceBetween={25}
                    effect='coverflow'
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    // autoplay={{ delay: 3000 }}
                    loop
                    thumbs={{ swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null }}
                >
                    <SwiperSlide className={style.apartmentSliders__slide}>
                        <img className={style.apartmentSliders__image} src={planImg} alt="planImg" />
                    </SwiperSlide>
                    <SwiperSlide className={style.apartmentSliders__slide}>
                        <img className={style.apartmentSliders__image} src={pictureFromWindowImg} alt="planImg" />
                    </SwiperSlide>
                    <SwiperSlide className={style.apartmentSliders__slide}>
                        <img className={style.apartmentSliders__image} src={planImg} alt="planImg" />
                    </SwiperSlide>
                    <SwiperSlide className={style.apartmentSliders__slide}>
                        <img className={style.apartmentSliders__image} src={pictureFromWindowImg} alt="planImg" />
                    </SwiperSlide>
                </Swiper>
                <Swiper
                    className={`${style.thumbs} apartmentSliders__thumbs`}
                    onSwiper={setActiveThumb}
                    slidesPerView={4}
                    freeMode
                    watchSlidesProgress
                    modules={[Navigation, FreeMode, Thumbs]}
                >
                    <SwiperSlide className={style.thumbs__slide}><div className={style.thumbs__button}><img className={style.thumb__icon} src={planIcon} alt="planIcon" /> <p className={style.thumb__text}>Планировка</p></div></SwiperSlide>
                    <SwiperSlide className={style.thumbs__slide}><div className={style.thumbs__button}><img className={style.thumb__icon} src={watchWindowIcon} alt="watchWindowIcon" /> <p className={style.thumb__text}>Вид из окна</p></div></SwiperSlide>
                    <SwiperSlide className={style.thumbs__slide}><div className={style.thumbs__button}><img className={style.thumb__icon} src={stageIcon} alt='stageIcon' /> <p className={style.thumb__text}>План этажа</p></div></SwiperSlide>
                    <SwiperSlide className={style.thumbs__slide}><div className={style.thumbs__button}><img className={style.thumb__icon} src={genplanIcon} alt='genplanIcon' /><p className={style.thumb__text}> Генплан</p></div></SwiperSlide>
                </Swiper>
            </div>
            <ButtonArrow className="swiper-button-next" size='medium' direction='right' theme='light' />
        </div>
    )
}
export default ApartmentSliders