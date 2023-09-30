import { ChangeEventHandler } from 'react';
import './Input.css'

interface InputProp {
    title: string;
    name: string;
    value: string;

    required: boolean;

    onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
}

interface InputTextProp extends InputProp {
    onChange: ChangeEventHandler<HTMLInputElement>;
}


interface InputSelectProp extends InputProp {
    options: string[];

    onChange: ChangeEventHandler<HTMLSelectElement>;
}

export function InputText(params: InputTextProp) {
    const { name, value, onChange, ...attributes } = params

    return (
        <div className="input-container">
            <p>{params.title}</p>
            <input name={params.name} type="text" value={params.value} onChange={params.onChange} {...attributes} />
        </div>
    );
}

export function InputSelect(params: InputSelectProp) {
    const { name, value, options, onChange, ...attributes } = params

    const optionsRender = params.options.map(value => <option key={value}>{value}</option>)

    return (
        <div className="input-container">
            <p>{params.title}</p>
            <select name={params.name} onChange={params.onChange} value={params.value} {...attributes}>
                {optionsRender}
            </select>
        </div>
    )
}