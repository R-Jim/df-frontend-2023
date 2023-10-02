import { ChangeEventHandler } from 'react';
import './Input.css'
import { InputProp } from './InputText';

interface InputSelectProp extends InputProp {
    options: string[];

    onChange: ChangeEventHandler<HTMLSelectElement>;
}

function InputSelect(params: InputSelectProp) {
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
};

export default InputSelect;