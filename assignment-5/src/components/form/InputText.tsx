import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'

export interface InputProp {
    title: string
    name: string
    register?: UseFormRegister<FieldValues>
    registerOptions?: RegisterOptions<FieldValues, string>
    error?: string
}

interface InputTextProp extends InputProp {}

function InputText(props: InputTextProp) {
    const register =
        props.register !== undefined
            ? props.register(props.name, props.registerOptions)
            : null

    return (
        <div className="input-container">
            <p className="text-input-label-color font-bold mb-0.5 m-0">
                {props.title.toString()}
            </p>
            <input
                type="text"
                {...register}
                className="border-border-color w-full box-border px-2.5 py-[8.25px] rounded-[5px] border-[1.5px] border-solid"
            />
            <span className="text-red-600 mb-0.5 m-0">{props.error}</span>
        </div>
    )
}

export default InputText
