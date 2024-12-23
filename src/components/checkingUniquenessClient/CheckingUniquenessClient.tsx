import InputField from "../../UI/inputField/InputField";
import style from './CheckingUniquenessClient.module.scss'
import Button from "../../UI/button/Button";
import CheckBox from "../../UI/checkBox/CheckBox";
import { useForm } from "react-hook-form";
import mask from "../../util/phone-mask";
import { REGEX } from "../../constants/reg";
import { useMutation } from "react-query";
import { regStart } from "../../api/auth";
import { toast } from "react-toastify";
import closeIcon from '../../assets/svg/clear-filter.svg'
import React from "react";
interface ICheckingUniquenessClientProps {
    onClose: () => void
}

const CheckingUniquenessClient: React.FC<ICheckingUniquenessClientProps> = React.forwardRef((props) => {
    const { onClose } = props
    const { register, handleSubmit, formState: { errors } } = useForm({ shouldFocusError: false });
    useMutation(regStart,
        {
            onSuccess() {
                toast.success("Заявка на проверку уникальности клиента успешно отправлена!");
            },
            onError(e) {
                toast.error(String(e));
            }
        }
    );
    const onSubmit = () => {
        // regStartMutation(data as LiveRequestRegistrationType)

    }
    return (
        <div className={style.checkingUniquenessClient}>
            <div className={style.checkingUniquenessClient__header}>
                <h2 className={style.checkingUniquenessClient__title}>
                    Проверка уникальности клиента
                </h2>
                <img src={closeIcon} alt="closeIcon" className={style.checkingUniquenessClient__closeIcon} onClick={onClose} />
            </div>
            <p className={style.checkingUniquenessClient__description}>Заполните заявку и наш менеджер свяжется с вами
                в ближайшее время</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.inputs__list}>
                    <InputField
                        type="text"
                        placeholder="Фамилия*"
                        register={register("lastName", { required: true, pattern: REGEX.ONE_OR_MORE_WORDS_REGEX })}
                        isError={!!errors.lastName}
                    />
                    <InputField
                        type="text"
                        placeholder="Имя*"
                        register={register("name", { required: true, pattern: REGEX.ONE_OR_MORE_WORDS_REGEX })}
                        isError={!!errors.name}
                    />
                    <InputField
                        type="text"
                        placeholder="Отчество*"
                        register={register("surName", { required: true, pattern: REGEX.ONE_OR_MORE_WORDS_REGEX })}
                        isError={!!errors.surName}
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
                </div>
                <Button theme="blue" type="submit" size="long" fullWidth className={style.checkingUniquenessClient__button}>Отправить</Button>
                <CheckBox
                    className={style.checkingUniquenessClient__checkbox}
                    label="Я согласен с условиями обработки персональных данных и политикой концфиденциальности"
                    register={register("privacy", { required: true })}
                    isError={!!errors.privacy}
                />
            </form>

        </div>
    )
})

export default CheckingUniquenessClient