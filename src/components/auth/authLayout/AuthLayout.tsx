import styles from './AuthLayout.module.scss'
import 'swiper/css/pagination';
import 'swiper/css';
import logoIcon from '../../../assets/svg/logo.svg'
import { Outlet } from 'react-router-dom';
import MainSlider from '../../mainSlider/MainSlider';

interface AuthLayoutProps {
}
const AuthLayout: React.FC<AuthLayoutProps> = () => {
  return (
    <div className={styles.auth}>
      <MainSlider />
      <div className={styles.auth__component}>
        <img className={styles.auth__logo} src={logoIcon} alt="logo" />
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout