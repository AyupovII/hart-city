import InputField from "../../../UI/inputField/InputField";
import style from './AuthChangePassword.module.scss'
import Button from "../../../UI/button/Button";
import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { recoveryPassCheckCode, recoveryPassFinish } from "../../../api/auth";
import { toast } from "react-toastify";
import { useLayoutEffect } from "react";

const AuthChangePassword: React.FC = () => {
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(window.location.search);
    const passwordRecoveryCode = queryParams.get('passwordRecoveryCode') ?? "";
    const userId = queryParams.get('userId') ?? "";
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({ shouldFocusError: false });
    const { mutate: recoveryPassCheckCodeMutation } = useMutation(recoveryPassCheckCode, {
        onSuccess() {
            toast.success("Всё супер!");
        },
        onError(e) {
            toast.error(String(e))
        }
    })
    const { mutate: recoveryPassFinishMutation } = useMutation(recoveryPassFinish,
        {
            onSuccess() {
                toast.success("Вы успешно сменили пароль!");
                navigate('/auth')
            },
            onError(e) {
                toast.error(String(e))
            }
        }
    );
    const onSubmit = (data: FieldValues) => {
        const { password } = data
        recoveryPassFinishMutation({ userId, passwordRecoveryCode, password })
    }
    useLayoutEffect(() => {
        recoveryPassCheckCodeMutation({ userId, passwordRecoveryCode })
    }, [])
    return (
        <div className={style.authChangePassword}>
            <h2 className={style.authChangePassword__title}>Придумайте новый пароль</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.inputs__list}>
                    <InputField
                        type="password"
                        placeholder="Введите новый пароль*"
                        register={register("password", { required: true, minLength: 6 })}
                        isError={!!errors.password}
                    />
                    <InputField
                        type="password"
                        placeholder="Повторите пароль*"
                        register={{
                            ...register("repeatPassword",
                                {
                                    required: true,
                                    minLength: 6,
                                    validate: (value) => value === getValues("password"),
                                },
                            ),
                        }}
                        isError={!!errors.repeatPassword}
                    />
                </div>
                <Button theme="blue" type="submit" size="long" fullWidth className={style.authChangePassword__button}>Сохранить</Button>
            </form>

        </div>
    )
}

export default AuthChangePassword