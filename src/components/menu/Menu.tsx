import style from './Menu.module.scss'
import menuControlIcon from '../../assets/svg/menu-controll.svg'
import menuNameIcon from '../../assets/svg/menu-name.svg'
// @ts-ignore
import MenuIcon from '../../assets/svg/menu-icon.svg/?react'
import profileImage from '../../assets/img/profile.png'
import { useContext, useEffect } from 'react'
import MenuList from '../menuList/MenuList'

// @ts-ignore
import MobileMenuIcon from '../../assets/svg/mobile-menu-icon.svg?react'
// @ts-ignore
import CloseMenuIcon from '../../assets/svg/close-menu.svg?react'
import { Context } from '../../App'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getUser } from '../../api/user'
import { BASE_URL } from '../../constants/url'

const Menu: React.FC = () => {
    const { data } = useQuery('getUser', getUser, {});

    const { setHiddenScroll, menuOpen, setMenuOpen } = useContext(Context)
    const navigate = useNavigate()
    const openMenu = () => {
        setMenuOpen(!menuOpen)
        setHiddenScroll(!menuOpen)
    }
    const closeMenu = () => {
        setMenuOpen(false)
        setHiddenScroll(false)
    }
    let userData = data?.data;
    console.log(userData)
    useEffect(() => {
        /////закрываем меню и включаем скролл при переключении на разрешения декстопа
        const handleResize = () => {
            if (window.innerWidth >= 1024 && window.innerWidth <= 1280) {
                closeMenu()
            };
        }
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={"menu"}>
            <div className={`${style.menu} ${menuOpen ? style['menu--open'] : ''}`}>
                <div className={style.menu__header}>
                    <div className={style['menu__main-logo']}>
                        <MenuIcon className={style['menu__menu-icon']}  />
                        <img className={style['menu__menu-name-icon']} src={menuNameIcon} alt="menuNameIcon" />
                    </div>
                    <img
                        className={style['menu__menu-control-icon']}
                        src={menuControlIcon}
                        alt="menuControlIcon"
                        onClick={() => setMenuOpen(!menuOpen)}
                    />
                </div>
                <div className={style.menu__container}>
                    <div className={style.menu__profile} onClick={() => navigate('/profile')}>
                        <img className={style['menu__profile-photo']} src={BASE_URL + userData?.photo} />
                        <div className={style['menu__profile-info']}>
                            <p className={style['menu__profile-name-text']}>{`${userData?.name} ${userData?.lastName}`}</p>
                            <p className={style['menu__profile-name-company']}>{userData?.agency}</p>
                        </div>
                    </div>
                    <MenuList menuOpen={menuOpen} />
                </div>
            </div>
            <div className={`${style.menu_mobile} ${menuOpen ? style['menu_mobile--open'] : ''}`}>  
                <div className={style['menu_mobile__header']}>
                    <div className={style.menu_mobile__profile} onClick={() => navigate('/profile')}>
                        <img className={style['menu_mobile__profile-photo']} src={BASE_URL + userData?.photo} />
                        <div className={style['menu_mobile__profile-info']}>
                            <p className={style['menu_mobile__profile-name-text']}>{`${userData?.name} ${userData?.lastName}`}</p>
                            <p className={style['menu_mobile__profile-name-company']}>{userData?.agency}</p>
                        </div>
                    </div>
                    <div className={style['menu_mobile__menu-icon']} onClick={openMenu}>
                        {menuOpen ? <CloseMenuIcon /> : <MobileMenuIcon />}
                    </div>
                </div>
                <div className={`${style.menu_mobile__container} ${menuOpen ? style['menu_mobile__container--open'] : ''}`}>
                    <div className={style.menu_mobile__content}>
                        <MenuList menuOpen={menuOpen} isMobile={true} closeMenu={closeMenu} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu