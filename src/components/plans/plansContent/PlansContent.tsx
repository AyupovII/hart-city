import style from './PlansContent.module.scss'
// @ts-ignore
import ListTypeIcon from '../../../assets/svg/list-type.svg?react'
// @ts-ignore
import TableTypeIcon from '../../../assets/svg/table-type.svg?react'
import { useState } from 'react'
import Modal from '../../modal/Modal'
import DetailedApartment from '../../detailedApartment/DetailedApartment'
import PlansList from '../plansList/PlansList'

interface IPlansContentProps {
  setIsTableType: React.Dispatch<React.SetStateAction<boolean>>
  isTableType: boolean
  planingList?: PlansContentType[]
  count?: number
}
export type PlansContentType = {
  id: number
  title: string
  area: number
  floor: number
  price: number
  type: string
  picture: string
  rooms: number
  
}
const PlansContent: React.FC<IPlansContentProps> = ({ setIsTableType, isTableType, planingList, count }) => {
  const [isModalActive, setModalActive] = useState(false);
  const [selectApartmentId, setSelectApartmentId] = useState<number | null>(null);
  const handleModalOpen = (id: number) => {
    setSelectApartmentId(id);
    setModalActive(true);
  };
  const handleModalClose = () => {
    setSelectApartmentId(null);
    setModalActive(false);
  };
  return (
    <>
      <div className={style.plans}>
        <div className={style.plans__type}>
          <p className={style.plans__title}>
            Доступные планировки ({count})
          </p>
          <div className={style.plans__icons}>
            <div className={`${style.plans__icon} ${isTableType ? style['plans__icon--active'] : ""}`} onClick={() => setIsTableType(true)}>
              <TableTypeIcon className={style.plans__tableTypeIcon} />
            </div>
            <div className={`${style.plans__icon} ${!isTableType ? style['plans__icon--active'] : ""}`} onClick={() => setIsTableType(false)}>
              <ListTypeIcon className={style.plans__listTypeIcon} />
            </div>
          </div>
        </div>
        <PlansList isTableType={isTableType} onClick={handleModalOpen} planingList={planingList ?? []} />
      </div>
      {isModalActive && (
        <Modal onClose={handleModalClose}>
          {selectApartmentId && <DetailedApartment onClick={handleModalOpen} apartmentId={selectApartmentId} />}
        </Modal>
      )}
    </>
  )
}

export default (PlansContent)