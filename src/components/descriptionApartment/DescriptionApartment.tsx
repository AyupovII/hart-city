import Accordion from '../../UI/accordion/Accordion'
import Button from '../../UI/button/Button'
import style from './DescriptionApartment.module.scss'
// @ts-ignore
import DownloadIcon from '../../assets/svg/download.svg?react'
import { ApartmentType } from '../../types/apartament'
import CheckingUniquenessClient from '../checkingUniquenessClient/CheckingUniquenessClient'
import { useState } from 'react'
import Modal from '@mui/material/Modal'
import ApartmentApplication from '../apartmentApplication/ApartmentApplication'

interface IApartmentData {
    apartmentData: ApartmentType
}
const DescriptionApartment: React.FC<IApartmentData> = ({apartmentData}) => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    return (
        <div className={style.descriptionApartment}>
            <div className={style.descriptionApartment__header}>
                <div className={style.descriptionApartment__title}>
                    <p className={style.descriptionApartment__text}>{apartmentData.name}</p>
                    <div className={style.descriptionApartment__download}>
                        <DownloadIcon className={style.descriptionApartment__downloadIcon} />
                        <span className={style.descriptionApartment__downloadText}>PDF</span>
                    </div>
                </div>
                <p className={style.descriptionApartment__date}>Срок сдачи III кв. 2025 г.</p>
                <p className={style.descriptionApartment__price}>{(apartmentData.price).toLocaleString('ru-RU')} ₽</p>
                <div className={`${style.descriptionApartment__download} ${style["descriptionApartment__download--tablet"]}`}>
                    <DownloadIcon className={style.descriptionApartment__downloadIcon} />
                    <span className={style.descriptionApartment__downloadText}>PDF</span>
                </div>
            </div>
            <div className={style.descriptionApartment__content}>
                <div className={style['descriptionApartment__credit-info']}>
                    <div className={style.descriptionApartment__credit}>
                        <p>В ипотеку —</p> <span>от 30 125&nbsp;₽</span>
                    </div>
                    <div className={style.descriptionApartment__credit}>
                        <p>Первоначальный взнос — </p> <span>от {(1500000).toLocaleString('ru-RU')}&nbsp;₽</span>
                    </div>
                </div>
                <div className={style.descriptionApartment__info}>
                    <p>{apartmentData.rooms} комн.</p>
                    <p>{(apartmentData.area).toLocaleString('ru-RU')} м<sup>2</sup></p>
                    <p>{apartmentData.finishing}</p>
                    <p>{apartmentData.floor} этаж из 15</p>
                </div>
                <Accordion title="Все характеристики" open>
                    <div className={style.descriptionApartment__character}>
                        <div className={style.descriptionApartment__characterContent}>
                            <p>Срок сдачи</p>
                            <p>III квартал 2025 г.</p>
                        </div>
                        <div className={style.descriptionApartment__characterContent}>
                            <p>Количество комнат</p>
                            <p>{apartmentData.rooms} комнаты</p>
                        </div>
                        <div className={style.descriptionApartment__characterContent}>
                            <p>Площадь</p>
                            <p>{apartmentData.area} м²</p>
                        </div>
                        <div className={style.descriptionApartment__characterContent}>
                            <p>Отделка</p>
                            <p>{apartmentData.finishing}</p>
                        </div>
                        <div className={style.descriptionApartment__characterContent}>
                            <p>Этаж</p>
                            <p>7 / 15</p>
                        </div>
                    </div>
                </Accordion>
                <div className={style.descriptionApartment__buttons}>
                    <Button theme="blue" size="medium" fullWidth onClick={() => setIsOpenModal(true)}>Оставить заявку</Button>
                    <Button theme="grayLight" size="medium" fullWidth>Отправить PDF на почту</Button>
                </div>
            </div>
            <Modal open={isOpenModal} >
                <ApartmentApplication onClose={() => setIsOpenModal(false)} />
            </Modal>
        </div>
    )
}
export default DescriptionApartment