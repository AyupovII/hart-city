import style from './PlansList.module.scss'
import PlansCard from '../plansCard/PlansCard'
import { PlansContentType } from '../plansContent/PlansContent'


interface IPlaningListProps {
    isTableType?: boolean
    onClick: (id: number) => void
    planingList: PlansContentType[]
}
const PlansList: React.FC<IPlaningListProps> = ({ isTableType = true, onClick, planingList }) => {
    return (
        <div className={`${style.plansList__content} ${!isTableType ? style['plansList__content--list'] : ""}`} >
            {
                planingList.map((item: PlansContentType) =>
                    <PlansCard
                        key={item.id}
                        {...item}
                        isTableType={isTableType}
                        onClick={()=>onClick(item.id)}
                    />)
            }
        </div>
    )
}
export default PlansList