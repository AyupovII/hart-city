import { Slider as MUISlider } from '@mui/material'
import style from './Slider.module.scss'
import { useState } from 'react';

interface ISliderProps {
  min: number
  max: number
  unitOfMeasure: React.ReactNode | string
  label: string
  className?: string
  minDistance: number
  onChange:  (event: Event, value: number | number[], activeThumb: number) => void
  value: number[]
}
const Slider: React.FC<ISliderProps> = ({ min, max, unitOfMeasure, label, minDistance, onChange, value, className = "" }) => {
  return (
    <div className={`${style.slider} ${className}`}>
      <label className={style.select__label}>{label}</label>
      <div className={style.slider__wrapper}>
        <div className={style.slider__inputs}>
          <div className={style["slider__input-wrapper"]}>
            <span>от</span>
            <input className={style["slider__inputs-first"]} type="text" placeholder="от" value={value[0]} onChange={(e) => onChange(e as unknown as Event, [+e.target.value, value[1]], 0)} />
          </div>
          <span className={style.slider__separator}></span>
          <div className={style["slider__input-wrapper"]}>
            <span>до</span>
            <input className={style["slider__inputs-second"]} type="text" placeholder="от" value={value[1]} onChange={(e) => onChange(e as unknown as Event, [value[0], +e.target.value,], 0)} />
            <span>{unitOfMeasure}</span>
          </div>
        </div>
        <MUISlider
          className={style.slider__mui}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          // onChangeCommitted={(_e, value) => onChange(value as number[])}
        />
      </div>
    </div >
  )
}

export default Slider