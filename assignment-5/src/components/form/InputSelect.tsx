import { ChangeEventHandler } from 'react'
import { InputProp } from './InputText'

interface InputSelectProp extends InputProp {
    options: string[]

    onChange: ChangeEventHandler<HTMLSelectElement>
}

function InputSelect(params: InputSelectProp) {
    const { name, value, options, onChange, ...attributes } = params

    const optionsRender = params.options.map((value) => (
        <option key={value}>{value}</option>
    ))

    return (
        <div className="input-container">
            <p className="text-input-label-color font-bold mb-0.5 m-0">
                {params.title}
            </p>
            <select
                name={params.name}
                onChange={params.onChange}
                value={params.value}
                {...attributes}
                className="border-border-color w-full box-border px-2.5 py-[8.25px] rounded-[5px] border-[1.5px] border-solid"
            >
                {optionsRender}
            </select>
        </div>
    )
}

export default InputSelect
