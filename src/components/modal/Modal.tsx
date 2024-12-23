import { MouseEventHandler, useCallback, useContext, useEffect, useRef, useState } from 'react';
import style from './Modal.module.scss';
import Portal, { createContainer } from '../portal/Portal';
import { Context } from '../../App';
import closeModalIcon from '../../assets/svg/close-modal.svg';

const MODAL_CONTAINER_ID = "modal-container-id";
const MODAL_BACKGROUND_ID = "modal-background-id";
const CONTENT_BACKGROUND_ID = "content-background-id";

interface IModalProps {
    title?: string
    onClose?: () => void
    children?: React.ReactNode | React.ReactNode[]

}
const Modal: React.FC<IModalProps> = ({ children, onClose }) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const [isMounted, setMounted] = useState(false);
    const { setHiddenScroll } = useContext(Context)
    useEffect(() => {
        const mainLayout = document.getElementsByClassName("mainLayout__content")[0];
        const content = document.getElementsByClassName("content")[0];
        const menu = document.getElementsByClassName("menu")[0];
        createContainer({ id: MODAL_BACKGROUND_ID, mountNode: menu as HTMLElement });
        createContainer({ id: MODAL_CONTAINER_ID, mountNode: mainLayout as HTMLElement });
        createContainer({ id: CONTENT_BACKGROUND_ID, mountNode: content as HTMLElement });
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleWrapperClick = (event: MouseEvent) => {
            const { target } = event;

            if (target instanceof Node && rootRef.current === target) {
                onClose?.();
                setHiddenScroll(false)
            }
        };
        const handleEscapePress = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose?.();
                setHiddenScroll(false)
            }
        };

        window.addEventListener("click", handleWrapperClick);
        window.addEventListener("keydown", handleEscapePress);

        return () => {
            window.removeEventListener("click", handleWrapperClick);
            window.removeEventListener("keydown", handleEscapePress);
        };
    }, [onClose]);

    const handleClose: MouseEventHandler<
        HTMLDivElement | HTMLButtonElement
    > = useCallback(() => {
        onClose?.();
        setHiddenScroll(false)
    }, [onClose]);
    useEffect(() => {
        if (isMounted) {
            // setHiddenScroll(true)
        }
    }, [isMounted])

    return isMounted ? (
        <div className={style.modal__wrapper}>
            <Portal id={MODAL_BACKGROUND_ID}>
                <div className={style.modal__background}>
                </div>
            </Portal>
            <Portal id={CONTENT_BACKGROUND_ID}>
                <div className={style.modal__background}>
                </div>
            </Portal>
            <Portal id={MODAL_CONTAINER_ID}>
                <div className={style.modal} ref={rootRef}>
                    <div className={style.modal__closeIcon} onClick={handleClose} >
                        <img src={closeModalIcon} alt="close" />
                    </div>
                    <div className={style.modal__content}>
                        {children}
                    </div>
                </div>
            </Portal>
        </div>
    ) : null;
}

export default Modal