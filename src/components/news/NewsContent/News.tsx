import Button from "../../../UI/button/Button"
import NewsCard from "../NewsCard/NewsCard"
import style from "./News.module.scss"
const News: React.FC = () => {
    return (
        <section>
            <h2>Новости и акции</h2>
            <div className={style.news}>
                <div className={style.news__list}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <NewsCard key={index} />
                    ))}
                </div>
                <Button className={style.news__btn} size='long' theme="blue" type='button'>Больше новостей</Button>
            </div>

        </section>
    )
}

export default News