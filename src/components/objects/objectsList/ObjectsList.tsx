import { ObjectType } from '../../../types/objects';
import ObjectCard from '../objectCard/ObjectCard';
import style from './ObjectsList.module.scss'
interface IObjectsListProps {
    objectsList?: ObjectType[];
}
const ObjectsList: React.FC<IObjectsListProps> = ({ objectsList }) => {
    return (
        <div className={style.objectsList}>
            {
                objectsList?.map((object, index) => {
                    return <ObjectCard key={index} {...object} />
                })
            }
        </div>
    )
}

export default ObjectsList