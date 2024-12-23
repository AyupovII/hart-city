import Button from '../../UI/button/Button'
import ObjectsFilter from '../objects/objectsFilter/ObjectsFilter'
import style from './Filter.module.scss'
import filterIcon from '../../assets/svg/filter.svg'
import arrowRightIcon from '../../assets/svg/arrow-right.svg'
import ClearFilter from '../clearFilter/ClearFilter'
import { useState } from 'react'
import Modal from '../modal/Modal'
import { objectStore } from '../../store/objectStore/objectStore '
import { useSearchParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

interface IFilterProps {
    // dataFilter: FilterType
    refetch: () => void
}
const Filter: React.FC<IFilterProps> = ({ refetch }) => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams(window.location.search);

    const handleModalClose = () => {
        // setSelectApartmentId(null);
        setIsOpenModal(false);
    };
    // const { setHiddenScroll } = useContext(Context)
    // useEffect(() => {
    //     setHiddenScroll(isOpenModal)
    // }, [isOpenModal])
    const clearFilter = () => {
        objectStore.paramsReset()
        setSearchParams({});
        objectStore.paramsFilterReset();
        refetch()
    }

    return (
        <>
            <div className={style.filter}>
                <div className={style.filter__desktop}>
                    <ObjectsFilter refetch={refetch} clearFilter={clearFilter} />
                </div>
                <div className={style.filter__tablet}>
                    <Button className={style.filter__btn} size='medium' theme='blue' type='button' onClick={() => setIsOpenModal(true)}>
                        <div className={style['filter__btn-content']}>
                            <div className={style['filter__btn-name']}><img src={filterIcon} alt="" /><p>Фильтры <span>{objectStore.countUrlParams ? (`(${objectStore.countUrlParams})`) : ''}</span></p></div>
                            <img className={style['filter__btn-icon']} src={arrowRightIcon} alt="" />
                        </div>
                    </Button>
                    {objectStore.countUrlParams ? <ClearFilter clearFilter={clearFilter} /> : ''}
                </div>
            </div>
            {isOpenModal && <Modal onClose={handleModalClose}>
                <ObjectsFilter setIsOpenModal={setIsOpenModal} refetch={refetch} clearFilter={clearFilter} />
            </Modal>}
        </>

    )
}

export default observer(Filter)