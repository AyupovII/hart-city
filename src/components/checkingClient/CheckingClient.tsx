import { useState } from 'react'
import Button from '../../UI/button/Button'
import CheckingUniquenessClient from '../checkingUniquenessClient/CheckingUniquenessClient'
import style from './CheckingClient.module.scss'
import { Modal } from '@mui/material'
const CheckingClient: React.FC = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    return (
        <section>
            <div className={style.checkingClient}>
                <h2 className={style.checkingClient__title}>Проверка уникальности клиента</h2 >
                <Button theme="blur10" size="large" className={style.checkingClient__button} onClick={() => setIsOpenModal(true)}>Оставить заявку</Button>
            </div>
            {<Modal open={isOpenModal} >
                <CheckingUniquenessClient onClose={() => setIsOpenModal(false)} />
            </Modal>}
        </section>
    )
}
export default CheckingClient