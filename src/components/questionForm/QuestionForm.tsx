import { useForm } from 'react-hook-form'
import Button from '../../UI/button/Button'
import CheckBox from '../../UI/checkBox/CheckBox'
import InputField from '../../UI/inputField/InputField'
import style from './QuestionForm.module.scss'
import mask from '../../util/phone-mask'
const QuestionForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ shouldFocusError: false });
    async function onSubmit(data: any): Promise<void> {
        (data)
    }

    return (
        <div className={style.questionForm}>
            <form className={style.questionForm__form} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.questionForm__header}>
                    <h3 className={style.questionForm__title}>Остались вопросы?</h3>
                    <p className={style.questionForm__text}>Мы поможем максимально упростить процесс поиска! Долой сомнения, просто позвоните нашему менеджеру или оставьте на сайте заявку на звонок.</p>
                </div>
                <div className={style.questionForm__fields}>

                    <div className={style.questionForm__inputs}>
                        <InputField
                            type="text"
                            placeholder="Фамилия Имя Отчество"
                            defaultValue=""
                            register={register("fio", {
                                required: true,
                                pattern: /^[A-Za-zА-Яа-я]+(-[A-Za-zА-Яа-я]+)*( [A-Za-zА-Яа-я]+(-[A-Za-zА-Яа-я]+)*( [A-Za-zА-Яа-я]+(-[A-Za-zА-Яа-я]+)*)?)?$/
                            })}
                            isError={!!errors.fio}
                        />
                        <InputField
                            type="tel"
                            placeholder="Телефон"
                            defaultValue=""
                            register={{
                                ...register("phone",
                                    {
                                        required: true,
                                        pattern: /^\+7 \([0-9]{3}\) [0-9]{3} [0-9]{4}$/,
                                    },
                                ),
                                onChange: async (e: any) => mask(e)
                            }}
                            isError={!!errors.phone}
                        />
                        <Button theme="blur10" type="submit" size="long" fullWidth className={style.questionForm__button}>Отправить</Button>
                    </div>
                    <CheckBox className={style.questionForm__checkbox} label="Я согласен с условиями обработки персональных данных и политикой концфиденциальности" />
                </div>
            </form>
        </div>
    )
}
export default QuestionForm