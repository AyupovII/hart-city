import { useEffect, useState } from 'react'
import style from './СhoiceApartments.module.scss'
import { Option } from '../../types/common'
interface IСhoiceApartmentsProps {
  label: string
  options: Option[]
  onChange: (value: Option) => void
  value?: Option[] | null
}
const СhoiceApartments: React.FC<IСhoiceApartmentsProps> = ({ label, options, onChange, value }) => {

  return (
    <div className={style.choiceApartments}>
      <label className={style.select__label}>{label}</label>
      <div className={style.choiceApartments__list}>
        {
          options.map((apartment) => {
            return <div className={`${style.choiceApartments__item} ${value?.find((item) => item.id === apartment.id) ? style['choiceApartments__item--active'] : ''}`} key={apartment.id} onClick={() => onChange(apartment)}>
              {apartment.value}
            </div>
          })
        }
      </div>
    </div>
  )
}
export default СhoiceApartments