import { ChangeEventHandler } from 'react';
import './Input.css'

export interface InputProp {
    title: string;
    name: string;
    value: string;

    required: boolean;

    onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
}

interface InputTextProp extends InputProp {
    onChange: ChangeEventHandler<HTMLInputElement>;
}

function InputText(params: InputTextProp) {
    const { name, value, onChange, ...attributes } = params

    return (
        <div className="input-container">
            <p>{params.title}</p>
            <input name={params.name} type="text" value={params.value} onChange={params.onChange} {...attributes} />
        </div>
    );
}

export default InputText;