import { YMaps, Map as YMap, Placemark } from '@pbe/react-yandex-maps'
import placemarkIcon from '../../assets/svg/placemark.svg'
import style from './Map.module.scss'
const Map: React.FC = () => {
    let zoomValue = 14;
    let size = 64;

    if (window.innerWidth < 769) {
        zoomValue = 12;
        size = 32;
    }
    // useEffect(() => {
    // }, [])
    // useEffect(() => {
    //     const mainLayout = document.getElementsByClassName("mainLayout__content")[0];
    //     const handleResize = () => {
    //         // if (window.innerWidth >= 1020) {
    //         // };
    //     }
    //     mainLayout.addEventListener('', handleResize);
    //     handleResize();

    //     return () => {
    //         mainLayout.removeEventListener('resize', handleResize);
    //     };

    // }, []);
    return (
        <div className={style.map} id='yandex-map'>
            <YMaps>
                <YMap
                    state={{ center: [54.729179, 55.947741], zoom: zoomValue }}
                    width={'100%'}
                    options={{ autoFitToViewport: 'always' }}
                >
                    <Placemark
                        geometry={[54.729179, 55.947741]}
                        options={{
                            iconImageSize: [size, size],
                            iconImageOffset: [-25, -55],
                            iconLayout: 'default#image',
                            iconImageHref: placemarkIcon,
                        }}
                    />
                </YMap>
            </YMaps>
        </div>
    )
}
export default Map