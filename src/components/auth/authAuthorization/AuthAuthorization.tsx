import style from './AuthAuthorization.module.scss'
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import InputField from '../../../UI/inputField/InputField';
import Button from '../../../UI/button/Button';
import { REGEX } from '../../../constants/reg';
import { signIn } from '../../../api/auth';
import store from '../../../store';
interface IAuthAuthorizationProps {
}
const AuthAuthorization: React.FC<IAuthAuthorizationProps> = () => {
    const authStore = store.authStore
    const navigate = useNavigate()
    // console.log(isObservable(authStore.setToken)); // true or false
    // console.log(isObservableProp(authStore.setToken, "setToken")); // true or false
    const { register, handleSubmit, formState: { errors } } = useForm({ shouldFocusError: false });
    const { mutate: signInMutation } = useMutation(signIn,
        {
            onSuccess() {
                authStore.setToken(localStorage.getItem('token')!);
                toast.success("Вы успешно авторизованы!");
            },
            onError(e) {
                toast.error(String(e))
            }

        }
    );
    async function onSubmit(data: any): Promise<void> {
        const { login, password } = data;
        signInMutation({ login, password });
    }

    return (
        <div className={style.authAuthorization}>
            <h2 className={style.authAuthorization__title}>Авторизация</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.inputs__list}>
                    <InputField
                        type="text"
                        placeholder="Логин"
                        defaultValue=""
                        register={register("login", { required: true, pattern: REGEX.EMAIL })}
                        isError={!!errors.login}
                    />
                    <InputField
                        register={register("password", { required: true, minLength: 6 })}
                        type={"password"}
                        placeholder="Пароль"
                        defaultValue=""
                        isError={!!errors.password}
                    />
                </div>
                <p className={style.forgot} onClick={() => navigate("/auth/password-recovery")}>
                    Забыли пароль?
                </p>
                <Button theme="blue" type="submit" size="long" fullWidth className={style.authAuthorization__button}>Войти</Button>
                <p className={style.authAuthorization__text}>Нет аккаунта? <span className={style.authAuthorization__link} onClick={() => navigate('/auth/live-request-registration')}>Оставить заявку</span></p>
            </form>

        </div>
    )
}

export default observer(AuthAuthorization)