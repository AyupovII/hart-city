import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import Blocks from "../blocks/Blocks";
import ButtonArrow from "../../UI/buttonArrow/ButtonArrow";
import styles from './MainSlider.module.scss'

const MainSlider: React.FC = () => {

    return (
        <div className={`${styles.mainSlider}`}>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={25}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                watchSlidesProgress
                // autoplay={{ delay: 3000 }}
                loop
                pagination={{
                    clickable: true,
                    type: 'bullets',
                    el: '.swiper-pagination',
                    renderBullet(_index, className) {
                        return '<span class="' + className + '">' + `<p></p>` + '</span>';
                    },
                }}

                // scrollbar={{ draggable: true }}

            >
                <SwiperSlide className={styles.mainSlider__slide}>
                    <h1 className={styles.slide__title}>Жильё бизнес класса
                        в вашем городе</h1>
                    <Blocks />
                </SwiperSlide>
                <SwiperSlide className={styles.mainSlider__slide}>
                    <h1 className={styles.slide__title}>Жильё бизнес класса
                        в вашем городе</h1>
                    <Blocks />
                </SwiperSlide>
                <SwiperSlide className={styles.mainSlider__slide}>
                    <h1 className={styles.slide__title}>Жильё бизнес класса
                        в вашем городе</h1>
                    <Blocks />
                </SwiperSlide>
            </Swiper>
            <div className={styles.mainSlider__controls}>
                <div className={`${styles.mainSlider__pagination} mainSlider__pagination swiper-pagination`} />
                <div className={styles.slider__buttons}>
                    <ButtonArrow className="swiper-button-prev" size='medium' direction='left' theme='dark' />
                    <ButtonArrow className="swiper-button-next" size='medium' direction='right' theme='dark' />
                </div>
            </div>
        </div>
    )
}

export default MainSlider