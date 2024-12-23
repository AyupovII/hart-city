import { Status } from '../../../assets/types/enum'
import SearchInput from '../../searchInput/SearchInput'
import Select from '../../../UI/select/Select'
import style from './RequestsFilter.module.scss'
const RequestsFilter: React.FC = () => {
    const option1 = [
        {
            id: 1,
            value: 'OptionValue1'
        },
        {
            id: 2,
            value: 'OptionValue2'
        },
        {
            id: 2,
            value: 'OptionValue3'
        },
    ]
    const option2 = [
        {
            id: 1,
            value: Status.IMPLEMENTED.text
        },
        {
            id: 2,
            value: Status.FIXATION_HAS_EXPIRED.text
        },
        {
            id: 3,
            value: Status.REJECTED.text,
        },
        {
            id: 4,
            value: Status.NOT_IMPLEMENTED.text,
        },
    ]
    return (
        <div className={style.requestsFilter}>
            <div className={style.requestsFilter__content}>
                <Select label='Тип клиента' options={option1} defaultValue={option1[0]} value={[option1[0]]} onSelect={() => { }} />
                <Select label='Статус заявки' options={option2} defaultValue={option2[0]} value={[option2[0]]} onSelect={() => { }} />
            </div>
            <SearchInput />
        </div>
    )
}
export default RequestsFilter