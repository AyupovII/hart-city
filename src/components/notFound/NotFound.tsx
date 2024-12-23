import Button from '../../UI/button/Button'
import style from './NotFound.module.scss'
const NotFound: React.FC = () => {
    return (
        <div className={style.notFound__wrapper}>
            <div className={style.notFound}>
                <div className={style.notFound__content}>
                    <h1 className={style.notFound__title}>404</h1>
                    <p className={style.notFound__text}>Упс! страница не найдена</p>
                </div>
                <Button theme="blue" size="long" className={style.notFound__button}>На главную</Button>
            </div>
        </div>
    )
}
export default NotFound