import InputField from "../../../UI/inputField/InputField";
import style from './AuthLiveRequestRegistration.module.scss'
import Button from "../../../UI/button/Button";
import CheckBox from "../../../UI/checkBox/CheckBox";
import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import mask from "../../../util/phone-mask";
import { REGEX } from "../../../constants/reg";
import { useMutation } from "react-query";
import { regStart } from "../../../api/auth";
import { toast } from "react-toastify";
import { LiveRequestRegistrationType } from "../../../types/form";
interface IAuthLiveRequestRegistrationProps {
}

const AuthLiveRequestRegistration: React.FC<IAuthLiveRequestRegistrationProps> = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({ shouldFocusError: false });
    const { mutate: regStartMutation } = useMutation(regStart,
        {
            onSuccess() {
                toast.success("Заявка на регистрацию успешно отправлена!");
            },
            onError(e) {
                toast.error(String(e))
            }
        }
    );
    const onSubmit = (data: LiveRequestRegistrationType | FieldValues) => {
        regStartMutation(data as LiveRequestRegistrationType)

    }
    return (
        <div className={style.authLiveRequestRegistration}>
            <h2 className={style.authLiveRequestRegistration__title}>
                Оставить заявку на регистрацию
            </h2>
            <p className={style.authLiveRequestRegistration__description}>Заполните заявку и наш менеджер свяжется с вами
                в ближайшее время</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.inputs__list}>
                    <InputField
                        type="text"
                        placeholder="Ваше имя"
                        register={register("name", { required: true, pattern: REGEX.ONE_OR_MORE_WORDS_REGEX })}
                        isError={!!errors.name}
                    />
                    <InputField
                        type="text"
                        placeholder="Ваше фамилия"
                        register={register("lastName", { required: true, pattern: REGEX.ONE_OR_MORE_WORDS_REGEX })}
                        isError={!!errors.lastName}
                    />
                    <InputField
                        type="text"
                        placeholder="Название агенства"
                        register={register("agency", { required: true, pattern: REGEX.ONE_OR_MORE_WORDS_REGEX })}
                        isError={!!errors.agency}
                    />

                    <InputField
                        type="tel"
                        placeholder="+7"
                        register={{
                            ...register("phone",
                                {
                                    required: true,
                                    pattern: REGEX.PHONE,
                                },
                            ),
                            onChange: async (e: any) => mask(e)
                        }}
                        isError={!!errors.phone}
                    />
                    <InputField
                        type={"email"}
                        placeholder="E-mail"
                        register={register("email", { required: true, pattern: REGEX.EMAIL })}
                        isError={!!errors.email}
                    />
                </div>
                <Button theme="blue" type="submit" size="long" fullWidth className={style.authLiveRequestRegistration__button}>Отправить</Button>
                <CheckBox
                    className={style.authLiveRequestRegistration__checkbox}
                    label="Я согласен с условиями обработки персональных данных и политикой концфиденциальности"
                    register={register("privacy", { required: true })}
                    isError={!!errors.privacy}
                />
                <p className={style.authLiveRequestRegistration__text}>Уже есть аккаунт? <span className={style.authLiveRequestRegistration__link} onClick={() => navigate('/auth')}>Войти</span></p>
            </form>

        </div>
    )
}

export default AuthLiveRequestRegistration