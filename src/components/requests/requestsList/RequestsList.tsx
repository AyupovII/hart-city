import { IRequestProps } from '../requestsItem/RequestsItem';
import style from './RequestsList.module.scss'
import RequestsItem from '../requestsItem/RequestsItem';
interface IRequestsListProps {
    requestsList: IRequestProps[];
}
const RequestsList: React.FC<IRequestsListProps> = ({ requestsList }) => {
    return (
        <div className={style.requestsList}>
            {
                requestsList.map((request) => {
                    return <RequestsItem key={request.id} {...request}/>
                })
            }
        </div>
    )
}

export default RequestsList