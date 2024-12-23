import InputField from "../../UI/inputField/InputField";
import style from './ApartmentApplication.module.scss'
import Button from "../../UI/button/Button";
import CheckBox from "../../UI/checkBox/CheckBox";
import { Controller, useForm } from "react-hook-form";
import mask from "../../util/phone-mask";
import { REGEX } from "../../constants/reg";
import { useMutation } from "react-query";
import { regStart } from "../../api/auth";
import { toast } from "react-toastify";
import closeIcon from '../../assets/svg/clear-filter.svg'
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import Select from "../../UI/select/Select";
import { Option } from '../../types/common'
import { Autocomplete, TextField } from "@mui/material";
import AutoComplete from "../../UI/selectCustom/Select";
interface IApartmentApplicationProps {
    onClose: () => void
}

const ApartmentApplication: React.FC<IApartmentApplicationProps> = React.forwardRef((props) => {
    const { onClose } = props
    const { register, handleSubmit, formState: { errors }, getValues, setValue, control } = useForm({ shouldFocusError: false });
    const [payment, setPayment] = useState<Option[]>()
    const onSubmit = () => {
        // regStartMutation(data as LiveRequestRegistrationType)

    }
    const options = [
        {
            id: 1,
            value: 'Наличкой'
        },
        {
            id: 2,
            value: 'По карте'
        }
    ]
    useEffect(() => {
        register('date', { required: true });
        register('payment', { required: true });
    }, [])
    return (
        <div className={style.apartmentApplication}>
            <div className={style.apartmentApplication__header}>
                <h2 className={style.apartmentApplication__title}>
                    Оставить заявку
                </h2>
                <img src={closeIcon} alt="closeIcon" className={style.apartmentApplication__closeIcon} onClick={onClose} />
            </div>
            <p className={style.apartmentApplication__description}>Заполните заявку и наш менеджер свяжется с вами
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

                    <Controller
                        control={control}
                        name='date'
                        render={({ field }) => (
                            <DatePicker
                                onChange={(date) => field.onChange(date)}
                                value={field.value || null}
                                className={style.datePicker + ' ' + style[errors.date ? 'datePicker__error' : ""]}
                                slotProps={{
                                    textField: {
                                        placeholder: "Планируемая дата встречи",
                                    },
                                }}

                            />
                        )}
                    />
                    {/* <Controller
                        control={control}
                        name='payment'
                        render={({ field }) => (
                            <Autocomplete
                                onChange={(_e, value) => field.onChange(value)}
                                // value={field.value || null}
                                options={options}
                                getOptionLabel={option => option.value}
                                getOptionKey={option => option.id}
                                className={style.datePicker + ' ' + style[errors.payment ? 'datePicker__error' : ""]}
                                renderInput={params => <TextField className={style.datePicker + ' ' + style[errors.payment ? 'datePicker__error' : ""]} placeholder="Предпочитаемая форма оплаты*" {...params} />}
                                defaultValue={options[0]}
                            />)
                        }
                    /> */}
                    <AutoComplete
                        name="payment"
                        control={control}
                        options={options}
                        defaultValue={options[0]}
                        isError={!!errors.payment}
                        placeholder="Предпочитаемая форма оплаты*"
                        value={getValues('payment')}
                        onChange={(e: Option) => { setValue('payment', e) }}
                    />

                    <Select
                        isError={!payment?.length}
                        onSelect={(option) => { setPayment((old) => old?.[0]?.id === option.id ? [] : [option]) }}
                        options={options}
                        value={payment ?? []}
                        placeholder="Предпочитаемая форма оплаты"
                    />
                    {/* <InputField
                        type="text"
                        placeholder="Отчество*"
                        register={register("surName", { required: true, pattern: REGEX.ONE_OR_MORE_WORDS_REGEX })}
                        isError={!!errors.surName}
                    /> */}
                </div>
                <div className={style.apartmentApplication__requirements}>
                    <h3 className={style.apartmentApplication__requirementsTitle}>Требуется дополнительно</h3>
                    <div className={style.apartmentApplication__checkList}>
                        <CheckBox
                            className={style.apartmentApplication__checkbox}
                            label="Кладовая"
                            color="gray_dark"
                            size="large"
                            register={register("storage")}
                            isError={!!errors.storage}
                        />
                        <CheckBox
                            className={style.apartmentApplication__checkbox}
                            label="Парковка"
                            color="gray_dark"
                            size="large"
                            register={register("parking")}
                            isError={!!errors.parking}
                        />
                    </div>
                </div>
                <Button theme="blue" type="submit" size="long" fullWidth className={style.apartmentApplication__button}>Отправить</Button>
                <CheckBox
                    className={style.apartmentApplication__checkbox}
                    color="blue-medium"
                    label="Я согласен с условиями обработки персональных данных и политикой концфиденциальности"
                    register={register("privacy", { required: true })}
                    isError={!!errors.privacy}
                />
            </form>

        </div>
    )
})

export default ApartmentApplication