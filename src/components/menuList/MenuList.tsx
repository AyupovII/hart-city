import style from './MenuList.module.scss'
// @ts-ignore
import HomeIcon from '../../assets/svg/menu-home-icon.svg?react'
// @ts-ignore
import ObjectIcon from '../../assets/svg/menu-object-icon.svg?react'
// @ts-ignore
import ClientsIcon from '../../assets/svg/menu-clients-icon.svg?react'
// @ts-ignore
import RequestIcon from '../../assets/svg/menu-request-icon.svg?react'
// @ts-ignore
import NotificationIcon from '../../assets/svg/menu-notification-icon.svg?react'
// @ts-ignore
import LogoutIcon from '../../assets/svg/logout.svg?react'
// @ts-ignore
import ContactsIcon from '../../assets/svg/menu-contacts-icon.svg?react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import store from '../../store'
// @ts-ignore

interface IMenuListProps {
    menuOpen: boolean
    isMobile?: boolean
    closeMenu?: () => void
}
const MenuList: React.FC<IMenuListProps> = ({ menuOpen, isMobile, closeMenu }) => {
    const authStore = store.authStore

    const menuList = [
        {
            name: 'Главная',
            icon: <HomeIcon />,
            link: '',
        },
        {
            name: 'Объекты',
            icon: <ObjectIcon />,
            link: 'objects',
        },
        {
            name: 'Клиенты',
            icon: <ClientsIcon />,
            link: 'clients',
        },
        {
            name: 'Заявки',
            icon: <RequestIcon />,
            link: 'my-requests',
        },
        {
            name: 'Новости и акции',
            icon: <NotificationIcon />,
            link: 'news-and-promotions',
        },
        {
            name: 'Контакты',
            icon: <ContactsIcon />,
            link: 'contacts',
        }
    ]
    const location = useLocation();
    const navigate = useNavigate();
    const onLinkClick = (link: string) => {
        if (isMobile) {
            navigate(link)
            closeMenu?.()
        } else {
            navigate(link)
        }
    }
    return (
        <div className={`${style.menuList__container} ${menuOpen ? style['menuList__container--open'] : ''}`}>
            <div className={`${style.menuList} ${menuOpen ? style['menuList--open'] : ''}`}>
                {menuList.map((item, index) => (
                    <div
                        key={index}
                        className={`${style.menuList__item} ${location.pathname.split('/')[1] === item.link ? style['menuList__item-active'] : ''}`}
                        onClick={() => onLinkClick(item.link)}
                    >
                        <div className={style['menuList__item-icon']}>{item.icon}</div>
                        <p className={style["menuList__item-name"]}>{item.name}</p>
                    </div>
                ))}
            </div>
            <div className={style.menu__logout} onClick={() => authStore.logout()}>
                <LogoutIcon className={style['menu__logout-icon']} />
                <p className={style['menu__logout-text']}>Выйти</p>
            </div>
        </div>
    )
}

export default MenuList