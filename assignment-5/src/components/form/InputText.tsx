import { ChangeEventHandler } from 'react'

export interface InputProp {
    title: string
    name: string
    value: string

    required: boolean

    onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
}

interface InputTextProp extends InputProp {
    onChange: ChangeEventHandler<HTMLInputElement>
}

function InputText(params: InputTextProp) {
    const { name, value, onChange, ...attributes } = params

    return (
        <div className="input-container">
            <p className="text-input-label-color font-bold mb-0.5 m-0">
                {params.title}
            </p>
            <input
                name={params.name}
                type="text"
                value={params.value}
                onChange={params.onChange}
                {...attributes}
                className="border-border-color w-full box-border px-2.5 py-[8.25px] rounded-[5px] border-[1.5px] border-solid"
            />
        </div>
    )
}

export default InputText
