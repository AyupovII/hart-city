import InputField from "../../../UI/inputField/InputField";
import style from './AuthPasswordRecovery.module.scss'
import Button from "../../../UI/button/Button";
import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { REGEX } from "../../../constants/reg";
import { useMutation } from "react-query";
import { recoveryPassStart } from "../../../api/auth";
import { toast } from "react-toastify";

const AuthPasswordRecovery: React.FC = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({ shouldFocusError: false });
    const { mutate: recoveryPassStartMutation } = useMutation(recoveryPassStart,
        {
            onSuccess() {
                toast.success("На вашу почту выслана ссылка для сброса пароля!");
            },
            onError(e) {
                toast.error(String(e))
            }
        }
    );
    const onSubmit = (data: FieldValues) => {
        const { email } = data
        recoveryPassStartMutation(email)
    }
    return (
        <div className={style.authPasswordRecovery}>
            <h2 className={style.authPasswordRecovery__title}>Забыли пароль</h2>
            <p className={style.authPasswordRecovery__description}>На этот адрес будет выслана ссылка для сброса пароля</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.inputs__list}>
                    <InputField
                        type="email"
                        placeholder="E-mail"
                        register={register("email", { required: true, pattern: REGEX.EMAIL })}
                        isError={!!errors.email}
                    />
                </div>
                <Button theme="blue" type="submit" size="long" fullWidth className={style.authPasswordRecovery__button}>Отправить</Button>
                <p className={style.authPasswordRecovery__text}>Уже есть аккаунт? <span onClick={() => navigate('/auth')} className={style.authPasswordRecovery__link}>Войти</span></p>
            </form>

        </div>
    )
}

export default AuthPasswordRecovery