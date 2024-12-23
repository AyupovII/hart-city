import { useEffect, useState } from 'react'
import PlansContent, { PlansContentType } from '../../plans/plansContent/PlansContent'
import style from './ObjectId.module.scss'
import Filter from '../../filter/Filter'
import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getApartments } from '../../../api/apartments'
import Button from '../../../UI/button/Button'
import Pagination from '../../pagination/Pagination'
import { observer } from 'mobx-react-lite'
import store from '../../../store'
import { ParamsFilterType } from '../../../store/objectStore/objectStore '

const ObjectId: React.FC = () => {
    const objectStore = store.objectStore
    let { objectId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams(window.location.search);

    const limit = (searchParams.get('limit') ?? objectStore.params.limit) as number;
    const page = (searchParams.get('page') ?? objectStore.params.page) as number;

    const { data, refetch } = useQuery(['apartments'], () => getApartments({ ...objectStore.params, page, limit, id: objectId }))

    const [isTableType, setIsTableType] = useState(true)
    const [loadedData, setLoadedData] = useState<PlansContentType[]>([...data?.apartments! ?? []])
    const [flag, setFlag] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    const totalPage = Math.ceil((data?.count ?? 0) / limit)
    const showMore = () => {
        objectStore.setParams({ page: Number(page) + 1 })
        setFlag(true)
    }

    const onPagination = (value: { page: number, limit: number }) => {
        objectStore.setParams(({ page: value.page, limit: value.limit }))
        setLoadedData([])
    }
    useEffect(() => {
        const obj: any = {};
        Object.entries(objectStore.params)
            .filter(([_, value]) => Boolean(value))
            .forEach(([key, value]) => {
                obj[key] = value;
            })
        setSearchParams({ ...obj } as URLSearchParams);

    }, [objectStore.params.page, objectStore.params.limit]);

    useEffect(() => {
        refetch().then((res) => {
            if (flag) {
                if (loadedData.length) {
                    setLoadedData((prev: PlansContentType[]) => [...prev, ...res.data?.apartments ?? []])
                }
                else setLoadedData([...data?.apartments!, ...res.data?.apartments!])
                setFlag(false)
            }
        })
    }, [searchParams])
    useEffect(() => {
        /////закрываем меню и включаем скролл при переключении на разрешения декстопа
        const handleResize = () => {
            if (window.innerWidth <= 1020) {
                setIsMobile(true);
                setIsTableType(true);
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
        objectStore.setParams({ limit, page })
    }, [])

    return (
        <section>
            <h2 className={style.objectId__title}>ЖК Новостойкино</h2>
            <div className={style.objectId}>
                <Filter refetch={refetch} />
                <PlansContent isTableType={isTableType} setIsTableType={setIsTableType} planingList={loadedData.length ? loadedData : data?.apartments ?? []} count={data?.count ?? 0} />
                <div className={`${style.objectId__control}  ${objectStore.params.page! < totalPage && style.objectId__control_active} `}>
                    <p className={style.objectId__text}>{objectStore.params.page}-{objectStore.params.limit} из {data?.count} элементов</p>
                    {
                        objectStore.params.page! < totalPage &&
                        <Button
                            className={style.objectId__button}
                            theme="blue"
                            size="long"
                            onClick={showMore}
                        >
                            Показать еще
                        </Button>}
                    {totalPage > 1 &&
                        <Pagination
                            className={style.objectId__pagination}
                            limit={objectStore.params.limit!}
                            totalPage={totalPage}
                            isMobile={isMobile}
                            currentPage={objectStore.params.page!}
                            onPagination={onPagination}
                        />
                    }
                </div>
            </div>
        </section>
    )
}

export default observer(ObjectId)