import { InputProp } from './InputText'

export interface InputSelectProp extends InputProp {
    options?: string[]
}

function InputSelect(props: InputSelectProp) {
    const register =
        props.register !== undefined
            ? props.register(props.name, props.registerOptions)
            : null

    return (
        <div className="input-container">
            <p className="text-input-label-color font-bold mb-0.5 m-0">
                {props.title.toString()}
            </p>
            <select
                {...register}
                className="border-border-color w-full box-border px-2.5 py-[8.25px] rounded-[5px] border-[1.5px] border-solid"
            >
                {props.options?.map((value) => (
                    <option key={value}>{value}</option>
                ))}
            </select>
            <span className="text-red-600 mb-0.5 m-0">{props.error}</span>
        </div>
    )
}

export default InputSelect
