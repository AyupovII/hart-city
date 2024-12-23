import style from './ObjectsFilter.module.scss'
import Slider from '../../../UI/slider/Slider'
import Select from '../../../UI/select/Select'
import СhoiceApartments from '../../choiceApartments/СhoiceApartments'
import ClearFilter from '../../clearFilter/ClearFilter'
import Button from '../../../UI/button/Button'
import { getApartmentsFilter } from '../../../api/apartments-filter'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useQuery } from 'react-query'
import { getCountApartments } from '../../../api/apartments'
import { useParams, useSearchParams } from 'react-router-dom'
import store from '../../../store'
import { Option } from '../../../types/common'
import { ParamsFilterType } from '../../../store/objectStore/objectStore '
import { useDebounceCallback } from 'usehooks-ts'

interface IFilterProps {
  refetch: () => void
  setIsOpenModal?: (value: boolean) => void
  clearFilter?: () => void
}

const ObjectsFilter: React.FC<IFilterProps> = ({ setIsOpenModal, refetch, clearFilter }) => {
  const [searchParams, setSearchParams] = useSearchParams(window.location.search);
  const areaFrom = searchParams.get('areaFrom') as unknown as number;
  const areaTo = searchParams.get('areaTo') as unknown as number;
  const priceFrom = searchParams.get('priceFrom') as unknown as number;
  const priceTo = searchParams.get('priceTo') as unknown as number;
  const type = searchParams.get('type') as unknown as number;
  const floors = searchParams.get('floors') as string;
  const rooms = searchParams.get('rooms') as string;

  let { objectId } = useParams();
  const { data: dataFilter } = useQuery('apartmentsFilter', () => getApartmentsFilter(objectId!))
  const filters = dataFilter?.filters;
  const optionsFloors = filters?.floors.map(floor => ({ id: floor, value: String(floor) })) ?? []
  const optionsRooms = filters?.rooms.map(room => ({ id: room, value: String(room) })) ?? []
  const objectStore = store.objectStore
  const { data: dataCount, refetch: refetchCount } = useQuery('apartmentsCount', () => getCountApartments({ ...objectStore.params, page: 0, id: objectId }))

  const setParamsObjectStore = useDebounceCallback((params) => objectStore.setParams(params), 1500, { leading: false })
  const onSelect = (type: string): any => {
    switch (type) {
      case "type":
        return (option: Option) => {
          const changed =
            objectStore.paramsFilter?.typeValue?.find((item: Option) => item?.id === option.id as unknown as number)
              ?
              objectStore.paramsFilter.typeValue.filter((item: Option) => item?.id !== option.id)
              :
              [option];
          objectStore.setParamsFilter({ typeValue: changed });
          objectStore.setParams({ [type]: changed[0]?.id });
        }

      case "floors":
        return (option: Option) => {
          const changed =
            objectStore.paramsFilter?.floorsValue?.find((item) => item?.id === option.id as unknown as number)
              ?
              objectStore.paramsFilter.floorsValue.filter((item) => item?.id !== option.id)
              :
              [...(objectStore.paramsFilter?.floorsValue?.filter((item) => item?.id) ?? []), option];
          objectStore.setParamsFilter({ floorsValue: changed });
          objectStore.setParams({ [type]: changed.map((item) => item.id).join(',') });
        }
      case "area":
      case "price":
        return (
          _event: Event,
          newValue: number | number[],
          activeThumb: number,
        ) => {
          const minDistance = type === "area" ? 10 : 10000;
          if (!Array.isArray(newValue)) {
            return;
          }
          if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
              objectStore.setParamsFilter({ [type + "Value"]: [newValue[0], newValue[0] + minDistance] });
            } else {
              objectStore.setParamsFilter({ [type + "Value"]: [newValue[1] - minDistance, newValue[1]] });
            }
          } else {
            objectStore.setParamsFilter({ [type + "Value"]: newValue });
          }
          setParamsObjectStore({ [type + "From"]: newValue[0], [type + "To"]: newValue[1] });
        }

      case "rooms":
        return (option: Option) => {
          const checked = objectStore.paramsFilter?.roomsValue?.find((item) => item.id === option.id)
            ?
            objectStore.paramsFilter.roomsValue.filter((item) => item?.id !== option.id)
            :
            [...(objectStore.paramsFilter?.roomsValue?.filter((item) => item?.id) ?? []), option];
          objectStore.setParamsFilter({ roomsValue: checked });
          objectStore.setParams({ rooms: checked.map((item) => item.id).join(',') });
        }
    }
  };

  const onShowApartments = () => {
    setIsOpenModal?.(false)
    const obj: any = {};
    Object.entries(objectStore.params)
      .filter(([_, value]) => Boolean(value))
      .forEach(([key, value]) => {
        obj[key] = value;
      })
    setSearchParams({ ...obj } as URLSearchParams);
  }

  useEffect(() => {
    objectStore.setParamsFilter({
      typeValue: [filters?.type.find((item) => item?.id == type) ?? null],
      floorsValue: floors?.split(',')?.map((item) => ({ id: Number(item), value: item })),
      roomsValue: rooms?.split(',')?.map((item) => ({ id: Number(item), value: item })) ?? null,
      areaValue: [areaFrom ?? filters?.minArea, areaTo ?? filters?.maxArea],
      priceValue: [priceFrom ?? filters?.minPrice, priceTo ?? filters?.maxPrice],
    })
    objectStore.setParams({ type, rooms, floors, areaFrom, areaTo, priceFrom, priceTo });
  }, [filters])

  useEffect(() => {
    refetchCount()
  }, [objectStore.paramsFilter])

  return (
    filters && <div className={style.objectsFilter}>
      <Select
        value={objectStore.paramsFilter?.typeValue ?? []}
        options={filters.type}
        label='Выберите тип недвижимости'
        onSelect={onSelect("type")}
        className={style.objectsFilter__select}
      />
      <Select
        value={objectStore.paramsFilter?.floorsValue ?? []}
        options={optionsFloors}
        label='Выберите этаж'
        onSelect={onSelect("floors")}
        multiple
      />
      <СhoiceApartments
        label='Укажите количество комнат'
        options={optionsRooms}
        onChange={onSelect("rooms")}
        value={objectStore.paramsFilter?.roomsValue ?? []}
      />
      <Slider
        value={objectStore.paramsFilter?.areaValue ?? [filters?.minArea, filters?.maxArea]}
        onChange={onSelect("area")}
        min={filters.minArea}
        max={filters.maxArea}
        minDistance={3}
        unitOfMeasure={<p>м<sup>2</sup></p>}
        label='Площадь'
      />
      <Slider
        value={objectStore.paramsFilter?.priceValue ?? [filters?.minPrice, filters?.maxPrice]}
        onChange={onSelect("price")}
        min={filters.minPrice}
        max={filters.maxPrice}
        minDistance={10000}
        unitOfMeasure={'₽'}
        label='Укажите стоимость'
        className={style.objectsFilter__slider}
      />
      <div className={style.objectsFilter__control}>
        <ClearFilter className={style.objectsFilter__clear} clearFilter={clearFilter} />
        <Button theme='blue' size='long' type='button' onClick={onShowApartments}>Показать {dataCount?.count} квартир</Button>
      </div>
    </div>
  )
}

export default observer(ObjectsFilter)