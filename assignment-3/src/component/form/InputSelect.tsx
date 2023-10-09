import { ChangeEventHandler } from 'react';
import './Input.css'
import { InputProp } from './InputText';

interface InputSelectProp extends InputProp {
    options: string[];

    onChange: ChangeEventHandler<HTMLSelectElement>;
}

function InputSelect(props: InputSelectProp) {
    const { name, value, options, onChange, ...attributes } = props

    const optionsRender = props.options.map(value => <option key={value}>{value}</option>)

    return (
        <div className="input-container">
            <p>{props.title}</p>
            <select name={props.name} onChange={props.onChange} value={props.value} {...attributes}>
                {optionsRender}
            </select>
        </div>
    )
};

export default InputSelect;