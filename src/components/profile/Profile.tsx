import InputField from '../../UI/inputField/InputField'
import style from './Profile.module.scss'
// @ts-ignore
import PenIcon from '../../assets/svg/pen.svg?react'
// @ts-ignore
import PlusIcon from '../../assets/svg/plus.svg?react'
import Button from '../../UI/button/Button'
import { FieldValues, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { BaseSyntheticEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { changePassword, getUser, updatePhoto } from '../../api/user'
import { BASE_URL } from '../../constants/url'
const Profile: React.FC = () => {

    const { register, getValues, handleSubmit, formState: { errors } } = useForm({ shouldFocusError: false });
    const { data, refetch } = useQuery('getUser', getUser, {});
    const { mutate: changePasswordMutation } = useMutation(changePassword,
        {
            onSuccess() {
                toast.success("Пароль успешно изменен!");
            },
            onError(e) {
                toast.error(String(e))
            }
        }
    );

    const { mutate: updatePhotoMutation } = useMutation(updatePhoto,
        {
            onSuccess() {
                toast.success("Фото успешно изменен!")
                refetch()
            },
            onError(e) {
                toast.error(String(e))
            }
        }
    );


    async function onSubmit(data: FieldValues, _e: BaseSyntheticEvent<object, any, any> | undefined) {
        changePasswordMutation({ oldPassword: data.oldPassword, password: data.password })
    }
    let userData = data?.data;
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            updatePhotoMutation(e.target.files[0])
        }
    }

    return (
        <div className={style.profile}>
            <h2 className={style.profile__title}>Профиль</h2>
            <div className={style.profile__content}>
                <div className={style.profile__photo}>
                    <div className={style["profile__edit-icon-wrapper"]}>
                        {userData?.photo && <img className={style.profile__image} src={BASE_URL + userData?.photo} alt="profile" />}
                        <div className={userData?.photo ? style["profile__plus-icon-wrapper"] : style["profile__plus-icon-wrapper-empty"]}>
                            <PlusIcon className={style["profile__plus-icon"]} />
                            <p className={style["profile__plus-text"]}> Изменить<br /> фото</p>
                            <input className={style.profile__input} type='file' accept="image/*" onChange={handleFileChange} />
                        </div>
                    </div>
                    <div className={style["profile__profile-name"]}>
                        <p className={style.profile__name}>{`${userData?.name} ${userData?.lastName}`}</p>
                        <div className={style.profile__edit}>
                            <p className={style["profile__edit-text"]}>Изменить фото</p>
                            <PenIcon className={style["profile__edit-icon"]} />
                        </div>
                    </div>
                </div>
                <form className={style.profile__info} onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.profile__fields}>
                        <p className={style.profile__label}>Контактная информация</p>
                        <div className={style.profile__inputs}>
                            <div className={style["profile__input-fields"]}>
                                <InputField
                                    readOnly
                                    type="text"
                                    placeholder="Ваше имя"
                                    defaultValue={userData?.name}
                                />
                                <InputField
                                    readOnly
                                    type="text"
                                    placeholder="Фамилия"
                                    defaultValue={userData?.lastName}
                                />
                                <InputField
                                    readOnly
                                    type="text"
                                    placeholder="Агентство"
                                    defaultValue={userData?.agency}
                                />
                            </div>
                            <div className={style["profile__input-fields"]}>
                                <InputField
                                    readOnly
                                    type="text"
                                    placeholder="Город"
                                    defaultValue={userData?.city}
                                />
                                <InputField
                                    readOnly
                                    type="text"
                                    placeholder="Телефон"
                                    defaultValue={userData?.phone}
                                />
                                <InputField
                                    readOnly
                                    type="email"
                                    placeholder="example@mail.ru"
                                    defaultValue={userData?.email}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={style.profile__fields}>
                        <p className={style.profile__label}>Сменить пароль</p>
                        <div className={style["profile__input-fields"]}>
                            <InputField
                                type="password"
                                placeholder="Текущий пароль*"
                                register={register("oldPassword", { required: true })}
                                isError={!!errors.oldPassword}
                                autoComplete="off"
                            />
                            <InputField
                                type="password"
                                placeholder="Введите новый пароль*"
                                register={register("password", { required: true })}
                                isError={!!errors.password}
                            />
                            <InputField
                                type="password"
                                placeholder="Повторите пароль*"
                                register={{
                                    ...register("repeatPassword",
                                        {
                                            required: true,
                                            validate: (value) => value === getValues("password"),
                                        },
                                    ),
                                }}
                                isError={!!errors.repeatPassword}
                            />
                        </div>
                    </div>
                    <Button theme="blue" type="submit" size="long" className={style.profile__button} >Сохранить изменения</Button>
                </form>
            </div>

        </div >
    )
}

export default Profile