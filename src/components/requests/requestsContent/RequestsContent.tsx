import Button from '../../../UI/button/Button'
import RequestsList from '../requestsList/RequestsList'
import style from './RequestsContent.module.scss'
const RequestsContent: React.FC = () => {
    const requestsList = [
        {
            id: 1,
            title: 'Название ЖК 1',
            description: "3-комн. квартира, 84,52 м²",
            fio: "Бутурамбеков М.Т.",
        },
        {
            id: 2,
            title: 'Название ЖК 1',
            description: "3-комн. квартира, 84,52 м²",
            fio: "Бутурамбеков М.Т.",
        },
        {
            id: 3,
            title: 'Название ЖК 1',
            description: "3-комн. квартира, 84,52 м²",
            fio: "Бутурамбеков М.Т.",
        },

    ]
    return (
        <section>
            <h2>Мои заявки</h2>
            <div className={style.requests}>
                <div className={style.requests__container}>
                    <RequestsList requestsList={requestsList} />
                    <Button theme="blue" size="long" className={style.requests__button}>Показать все заявки</Button>
                </div>
            </div>
        </section >
    )
}

export default RequestsContent