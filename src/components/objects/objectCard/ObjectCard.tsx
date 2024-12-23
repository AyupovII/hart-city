import style from './ObjectCard.module.scss';
import Button from '../../../UI/button/Button';
// @ts-ignore
import StreetIcon from '../../../assets/svg/street.svg?react'
import { useNavigate } from 'react-router-dom';
import { ObjectType } from '../../../types/objects';
import { BASE_URL } from '../../../constants/url';


const ObjectCard: React.FC<ObjectType> = ({ id, address, name, price, nearPlace, picture, tags }) => {
    const navigate = useNavigate()
    return (
        <div className={style.objectCard} style={{ backgroundImage: `url(${BASE_URL}/${picture})` }}>
            <div className={style.objectCard__tags}>
                {tags.map((tag) => <p key={tag} className={style.objectCard__sale}>{tag}</p>)}
            </div>
            <div className={style.objectCard__content}>
                <div className={style.objectCard__header}>
                    <h2 className={style.objectCard__title}>{name}</h2>
                    <div className={style['objectCard__common-info']}>
                        <p className={style.objectCard__address}>{address}</p>
                        <div className={style.objectCard__nearPlace}>
                            <div className={style.streetX}>
                                <StreetIcon className={style.streetX__icon} />
                                <p className={style.streetX__text}>{nearPlace[0]}</p>
                            </div>
                            <div className={style.streetY}>
                                <StreetIcon className={style.streetY__icon} />
                                <p className={style.streetY__text}>{nearPlace[1]}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.objectCard__info}>
                    <p className={style.objectCard__price}>от {price.toLocaleString('ru-RU')}&nbsp;₽</p>
                    <Button theme="blur" size="middle" className={style.objectCard__button} onClick={() => navigate(`/objects/${id}`)}>Подробнее</Button>
                </div>
            </div>

        </div>
    )
}

export default ObjectCard