import style from './Select.module.scss';
import { Control, Controller, FieldValues } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
interface IAutoCompleteProps {
  control: Control<FieldValues, any>
  options: {
    id: number;
    value: string;
  }[]
  name: string
  isError?: boolean
  placeholder?: string
  defaultValue?: { id: number; value: string }
  value?: { id: number; value: string }
  onChange?: any
}
const AutoComplete: React.FC<IAutoCompleteProps> = ({
  control,
  options,
  isError,
  placeholder,
  defaultValue,
  name,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return <Autocomplete
          onChange={(_e, value) => (field.onChange(value))}
          // value={field.value || null}
          options={options}
          getOptionLabel={option => option.value}
          getOptionKey={option => option.id}
          className={style.autocomplete + ' ' + style[isError ? 'autocomplete__error' : ""]}
          renderInput={params => <TextField className={style.autocomplete + ' ' + style[isError ? 'autocomplete__error' : ""]} placeholder={placeholder} {...params} />}
          defaultValue={defaultValue}
          renderOption={(props: React.HTMLAttributes<HTMLLIElement> & { key: number; }, option: { id: number; value: any }, state: any) => {
            return <li
              {...props}
              key={props.key!}
              className={`${style.select__option} ${state.selected && style['select__option--active']}`}
            >
              <span>{option.value}</span>
            </li>
          }

          }
        />
      }
      }
    />
  )

};

export default AutoComplete;

{/* <div role="presentation" class="MuiPopper-root MuiAutocomplete-popper css-2xrgrn-MuiPopper-root-MuiAutocomplete-popper" style="width: 551px; position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(440px, 604px);" data-popper-placement="bottom">
  <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiAutocomplete-paper css-1cv3st9-MuiPaper-root-MuiAutocomplete-paper" style="--Paper-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);">
    <ul role="listbox" id=":rl:-listbox" aria-labelledby=":rl:-label" class="MuiAutocomplete-listbox css-19166iz-MuiAutocomplete-listbox">
      <li tabindex="-1" role="option" id=":rl:-option-0" data-option-index="0" aria-disabled="false" aria-selected="false" class="MuiAutocomplete-option Mui-focused">Наличкой</li>
      <li tabindex="-1" role="option" id=":rl:-option-1" data-option-index="1" aria-disabled="false" aria-selected="false" class="MuiAutocomplete-option">По карте</li>
    </ul>
  </div>
</div> */}