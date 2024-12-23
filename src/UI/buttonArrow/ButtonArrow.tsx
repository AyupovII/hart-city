import styles from './ButtonArrow.module.scss'
// @ts-ignore
import iconArrowLight from '../../assets/svg/arrow-light.svg'
// @ts-ignore
import iconArrowDark from '../../assets/svg/arrow-dark.svg'
interface ButtonArrowProps {
  direction: "left" | "right"
  size: "small" | "medium"
  theme: "light" | "dark" 
  className?: string
  onClick?: () => void
}

const ButtonArrow: React.FC<ButtonArrowProps> = ({ direction = "right", size = "medium", className, theme = 'light', onClick }) => {
  return (
    <div className={`${styles.buttonArrow} ${className} ${styles[theme]}`} onClick={onClick}>
      <img className={`${styles.buttonArrow__icon} ${styles[direction]} ${styles[size]}`} src={theme === 'dark' ? iconArrowLight : iconArrowDark} alt="iconArrow" />
    </div>
  )
}

export default ButtonArrow