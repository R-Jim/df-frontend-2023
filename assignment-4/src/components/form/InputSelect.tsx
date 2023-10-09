import { ChangeEventHandler } from 'react'
import { InputProp } from './InputText'

interface InputSelectProp extends InputProp {
    options: string[]

    onChange: ChangeEventHandler<HTMLSelectElement>
}

function InputSelect(props: InputSelectProp) {
    const { name, value, options, onChange, ...attributes } = props

    return (
        <div className="input-container">
            <label
                htmlFor={props.name}
                className="text-input-label-color font-bold mb-0.5 m-0"
            >
                {props.title}
            </label>
            <select
                id={props.name}
                name={props.name}
                onChange={props.onChange}
                value={props.value}
                {...attributes}
                className="border-border-color w-full box-border px-2.5 py-[8.25px] rounded-[5px] border-[1.5px] border-solid"
            >
                {props.options.map((value) => (
                    <option key={value}>{value}</option>
                ))}
            </select>
        </div>
    )
}

export default InputSelect
