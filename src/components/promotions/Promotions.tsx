import Button from "../../UI/button/Button"
import NewsCard from "../news/NewsCard/NewsCard"
import style from "./Promotions.module.scss"
const Promotions: React.FC = () => {
    return (
        <section>
            <div className={style.promotions}>
                <div className={style.promotions__list}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <NewsCard key={index} />
                    ))}
                </div>
                <Button className={style.promotions__btn} size='long' theme="blue" type='button'>Больше акций</Button>
            </div>

        </section>
    )
}

export default Promotions