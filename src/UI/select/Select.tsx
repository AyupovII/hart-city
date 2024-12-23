import React, { useEffect, useRef, useState } from 'react';
import style from './Select.module.scss';
import InputField from '../inputField/InputField';
interface ISelectProps {
  label?: string;
  options: {
    id: number;
    value: string;
  }[]
  value: { id: number; value: string }[] | [null] | null;
  placeholder?: string;
  defaultValue?: { id?: number; value: string }
  multiple?: boolean
  className?: string
  onSelect: (option: { id: number; value: string }) => void
  register?: any,
  isError?: boolean
}
const Select: React.FC<ISelectProps> = ({
  register,
  label,
  isError,
  options = [{
    id: 0,
    value: 'Не выбрано'
  }],
  value,
  placeholder = 'Не выбрано',
  // defaultValue = null,
  multiple = false,
  className = '',
  onSelect,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (!ref.current || !ref.current.contains(event.target as Element)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  // const onChange = (option: { id: number; value: string }) => {
  //   const changed =
  //     selectValue?.find((item) => item?.id === option.id)
  //       ?
  //       selectValue.filter((item) => item?.id !== option.id)
  //       :
  //       multiple ? [...selectValue.filter((item) => item?.id), option] : [option];
  //   setSelectValue(changed);
  //   onSelect?.(changed);
  // }
  return (
    <div className={`${style.select} ${className}`} ref={ref}>
      <label className={style.select__label}>{label}</label>
      <div className={style.select__wrapper}>
        <InputField
          readOnly
          type="text"
          className={`${style.select__input} ${isOpen && style['select__input--open']}`}
          placeholder={placeholder}
          value={value?.map((option) => option?.value).sort().join(', ')}
          onClick={() => setIsOpen(!isOpen)}
          register={register}
          isError={isError}
        />
        <div className={`${style.select__options} ${isOpen && style['select__options--active']}`}>
          <ul className={style.select__list}>
            {options.map((option) => (
              <li
                key={option.value}
                className={`${style.select__option} ${value?.find((item: { id: number; value: string } | null) => item?.id == option?.id) && style['select__option--active']}`}
                onClick={() => onSelect(option)}
              >
                <span>{option.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )

};

export default React.memo(Select) ;