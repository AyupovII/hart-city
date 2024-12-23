import style from './ObjectsListAll.module.scss'
import Button from '../../../UI/button/Button'
import Pagination from '../../pagination/Pagination'
import { useEffect, useState } from 'react'
import { DataType, getObjects } from '../../../api/objects'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import { ObjectType } from '../../../types/objects'
import ObjectsList from '../objectsList/ObjectsList'
const ObjectsListAll: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams(window.location.search);
    const limit = (searchParams.get('limit') ?? 10) as number;
    const page = (searchParams.get('page') ?? 1) as number;
    const [params, setParams] = useState({ page, limit })
    const { data, refetch } = useQuery<DataType>('objects', () => getObjects(params))
    const [loadedData, setLoadedData] = useState<ObjectType[]>([])
    const totalPage = Math.ceil((data?.count ?? 0) / limit)
    const showMore = () => {
        setParams(prev => ({ ...prev, page: Number(prev.page) + 1 }))
        setLoadedData((prev: ObjectType[]) => [...prev, ...data?.objects ?? []])
    }
    useEffect(() => {
        /////закрываем меню и включаем скролл при переключении на разрешения декстопа
        const handleResize = () => {
            if (window.innerWidth <= 1020) {
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

    useEffect(() => {
        // setSearchParams({ limit: String(params.limit), page: String(params.page) });
        refetch()
    }, [params.limit, params.page])
    return (
        <div className={style.allObjectsList}>
            <h2 className={style.allObjectsList__title}>Объекты</h2>
            <ObjectsList objectsList={[...loadedData, ...data?.objects ?? []]} />
            <div className={`${style.allObjectsList__control}  ${params.page < totalPage && style.allObjectsList__control_active} `}>
                <p className={style.allObjectsList__text}>{params.page}-{params.limit} из {data?.count} элементов</p>
                {
                    params.page < totalPage &&
                    <Button
                        className={style.allObjectsList__button}
                        theme="blue"
                        size="long"
                        onClick={showMore}
                    >
                        Показать еще
                    </Button>}
                {totalPage > 1 && <Pagination limit={params.limit} className={style.allObjectsList__pagination} totalPage={totalPage} isMobile={isMobile} currentPage={params.page} onPagination={setParams} />}
            </div>
        </div>
    )
}

export default ObjectsListAll 