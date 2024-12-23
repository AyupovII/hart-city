import style from './DetailedApartment.module.scss'
import ApartmentSliders from '../apartmentSliders/ApartmentSliders'
import DescriptionApartment from '../descriptionApartment/DescriptionApartment'
import { useQuery } from 'react-query'
import { getSingleApartment } from '../../api/apartments'

interface IDetailedApartmentProps {
    onClick: (id: number) => void
    apartmentId: number
}
const DetailedApartment: React.FC<IDetailedApartmentProps> = ({apartmentId}) => {
    const { data } = useQuery('apartmentSingle', () => getSingleApartment(apartmentId))
    return (
        <div className={style.detailedApartment}>
            <section>
                <h1>ЖК Новостойкино {apartmentId}</h1>
                <div className={style.detailedApartment__wrapper}>
                    <ApartmentSliders />
                    {data?.apartment && <DescriptionApartment apartmentData={data.apartment}/>}
                </div>
            </section>
            <section>
                <h2>Похожие решения</h2>
                <div>
                    {/* <PlansList key={"test"} onClick={onClick} planingList={test} /> */}
                </div>
            </section>
        </div>
    )
}

export default DetailedApartment