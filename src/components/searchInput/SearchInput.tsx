import InputField from '../../UI/inputField/InputField'
import style from './SearchInput.module.scss'

const SearchInput: React.FC = () => {
    return (
        <div className={style.searchInput}>
            <InputField
                type="search"
                placeholder="Поиск"
            />
        </div>
    )
}

export default SearchInput