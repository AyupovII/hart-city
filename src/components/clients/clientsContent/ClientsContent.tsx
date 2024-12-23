import style from './Clients.module.scss'
import requestsList from '../../../mock/requests.json'
import Pagination from '../../pagination/Pagination'
import { useEffect, useState } from 'react'
import ClientsFilter from '../clientsFilter/ClientsFilter'
interface IClientsList {
    id: number,
    fio: string,
    type: string,
    phone: string,
}

const ClientsContent: React.FC = () => {
    const columnNames = ['ФИО', 'Телефон', 'Тип клиента']
    const columnNamesArray = [
        { value: 'ФИО', code: 'fio' },
        { value: 'Телефон', code: 'phone' },
        { value: 'Тип клиента', code: 'status' }
    ]
    // const updateMyRequests = requestsList.map(el => {
    //     return { ...el, phone: "+7 000 000-00-00" }
    // })
    const requestsDataList = requestsList as unknown as IClientsList[]
    const [isMobile, setIsMobile] = useState(false)


    useEffect(() => {
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
        <div className={style.clients__wrapper}>
            <h2 className={style.clients__title}>Клиенты</h2>
            <div className={style.clients}>
                <ClientsFilter />
                <div className={style.clients__content}>
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
                                <tr key={index}>
                                    <td>{request.fio}</td>
                                    <td>+7 000 000-00-00</td>
                                    <td>{request.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table className='table --tablet'>
                        <tbody className='table__body'>
                            {columnNamesArray.map((columnName, index) => (
                                <tr key={index}>
                                    <th>{columnName.value}</th>
                                    {/* {updateMyRequests.map((request, index) => (
                                        <td key={index}>{request[columnName.code as keyof typeof request]}</td>
                                    ))} */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={style.clients__control}>
                    <p className={style.clients__text}>1-10 из 90 элементов</p>
                    <Pagination limit={10} className={style.clients__pagination} currentPage={1} totalPage={10} isMobile={isMobile} onPagination={() => { }} />
                </div>
            </div>
        </div>
    )
}

export default ClientsContent