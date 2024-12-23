import style from './ObjectsContent.module.scss'
import Button from '../../../UI/button/Button'
import ObjectsList from '../objectsList/ObjectsList'
import { getMainPageObjects } from '../../../api/objects'
import { useQuery } from 'react-query'


const ObjectsContent: React.FC = () => {
    const { data } = useQuery('mainPageObjects', getMainPageObjects)
    return (
        data?.length && <section>
            <h2>Объекты</h2>
            <div className={style.objects}>
                <div className={style.objects__container}>
                    <ObjectsList objectsList={data} />
                    <Button theme="blue" size="long" className={style.objects__button}>Показать все объекты</Button>
                </div>
            </div>
        </section>
    )

}

export default ObjectsContent