import { Status } from '../../assets/types/enum'
import RequestsFilter from '../requests/requestsFilter/RequestsFilter'
import style from './MyRequests.module.scss'
import requestsList from '../../mock/requests.json'
import Pagination from '../pagination/Pagination'
import { useEffect, useState } from 'react'
import Modal from '../modal/Modal'
import RequestsCard from '../requests/requestsCard/RequestsCard'
import StatusCard from '../status/StatusCard'
interface IRequestList {
    id: number,
    fio: string,
    type: string,
    status: string,
    apartmentСomplex: string,
    apartment: string,
    manager: {
        id: 1,
        name: string,
        phone: string,
        email: string
    },
    daysLeft: 14
}

const MyRequests: React.FC = () => {
    const columnNames = ['ФИО', 'Тип клиента', 'Статус заявки', 'ЖК', 'Квартира', 'Менеджер', 'Осталось дней']
    const columnNamesArray = [
        { value: 'ФИО', code: 'fio' },
        { value: 'Тип клиента', code: 'type' },
        { value: 'Статус заявки', code: 'status' },
        { value: 'ЖК', code: 'apartmentСomplex' },
        { value: 'Квартира', code: 'apartment' },
        { value: 'Менеджер', code: 'manager' },
        { value: 'Осталось дней', code: 'daysLeft' }]
    const updateMyRequests = requestsList.map(el => {
        return { ...el, manager: el.manager.name }
    })
    const requestsDataList = requestsList as unknown as IRequestList[]
    const [isModalActive, setModalActive] = useState(false);
    const [, setSelectApartmentId] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false)
    const handleModalClose = () => {
        setSelectApartmentId(null);
        setModalActive(false);
    };
    const handleModalOpen = (id: number) => {
        setSelectApartmentId(id);
        setModalActive(true);
    };
    useEffect(() => {
        /////закрываем меню и включаем скролл при переключении на разрешения декстопа
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={style.myRequests__wrapper}>
            <h2 className={style.myRequests__title}>Мои заявки</h2>
            <div className={style.myRequests}>
                <RequestsFilter />
                <div className={style.myRequests__content}>
                    <table className='table'>
                        <thead className='table__head'>
                            <tr>
                                {
                                    columnNames.map((columnName, index) => <th key={index}>{columnName}</th>)
                                }
                            </tr>
                        </thead>
                        <tbody className='table__body'>
                            {requestsDataList.map((request, index) => (
                                <tr key={index} onClick={() => handleModalOpen(request.id)}>
                                    <td>{request.fio}</td>
                                    <td><StatusCard statusText={request.type} size='small'/></td>
                                    <td>{Status[request.status].text}</td>
                                    <td>{request.apartmentСomplex}</td>
                                    <td>{request.apartment}</td>
                                    <td>{request.manager.name}</td>
                                    <td>{request.daysLeft}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table className='table --tablet'>
                        <tbody className='table__body'>
                            {columnNamesArray.map((columnName, index) => (
                                <tr key={index}>
                                    <th>{columnName.value}</th>
                                    {updateMyRequests.map((request, index) => (
                                        <td key={index}>{request[columnName.code as keyof typeof request]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={style.myRequests__control}>
                    <p className={style.myRequests__text}>1-10 из 90 элементов</p>
                    <Pagination className={style.myRequests__pagination} currentPage={1} limit={10} onPagination={(value) => console.log(value)}  totalPage={10} isMobile={isMobile} />
                </div>
            </div>
            {isModalActive && (
                <Modal onClose={handleModalClose}>
                    <RequestsCard />
                </Modal>
            )}
        </div>
    )
}

export default MyRequests