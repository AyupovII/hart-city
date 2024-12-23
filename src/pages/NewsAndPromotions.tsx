import News from "../components/news/NewsContent/News"
import Promotions from "../components/promotions/Promotions"

const NewsAndPromotions: React.FC = () => {
    return (
        <div className="container">
            <News />
            <Promotions />
        </div>
    )
}
export default NewsAndPromotions