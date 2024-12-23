import Select from '../../../UI/select/Select'
import style from './ClientsFilter.module.scss'
const ClientsFilter: React.FC = () => {
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
            id: 3,
            value: 'OptionValue3'
        },
    ]

    return (
        <div className={style.clientsFilter}>
            <div className={style.clientsFilter__content}>
                <Select label='Тип клиента' options={option1} defaultValue={option1[0]} value={[option1[0]]} onSelect={() => { }} />
            </div>
            {/* <SearchInput /> */}
        </div>
    )
}
export default ClientsFilter