import Button from "../../../UI/button/Button"
import style from "./NewsCard.module.scss"
const NewsCard: React.FC = () => {
    return (
        <div className={style.newsCard}>
            <div className={style.newsCard__header}>
                <p className={style.newsCard__date}>14 сентября</p>
                <p className={style.newsCard__type}>
                    Новость
                </p>
            </div>
            <h4 className={style.newsCard__title}>
                Покупка квартир стала проще
            </h4>
            <p className={style.newsCard__text}>
                Обменяйте Вашу старую квартиру на новую. Получите профессиональную консультацию от наших специалистов и осуществите мечту — новая квартира.
            </p>
            <Button className={style.newsCard__btn} size='large' theme='darkGray' type='button'>Подробнее</Button>
        </div>
    )
}

export default NewsCard