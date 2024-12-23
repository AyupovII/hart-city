import { Outlet } from 'react-router-dom'
import Menu from '../menu/Menu'
import style from './MainLayout.module.scss'
interface MainLayoutProps {
    children?: React.ReactNode
}
const MainLayout: React.FC<MainLayoutProps> = ({ }) => {
    return (
        <div className={style.mainLayout}>
            <Menu />
            <div className={`${style.mainLayout__content} mainLayout__content`}>
                <div className={`${style.content} content`}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainLayout