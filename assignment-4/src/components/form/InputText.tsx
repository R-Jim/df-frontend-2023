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

function InputText(props: InputTextProp) {
    const { name, value, onChange, ...attributes } = props

    return (
        <div className="input-container">
            <label
                htmlFor={props.name}
                className="text-input-label-color font-bold mb-0.5 m-0"
            >
                {props.title}
            </label>
            <input
                id={props.name}
                name={props.name}
                type="text"
                value={props.value}
                onChange={props.onChange}
                {...attributes}
                className="border-border-color w-full box-border px-2.5 py-[8.25px] rounded-[5px] border-[1.5px] border-solid"
            />
        </div>
    )
}

export default InputText
