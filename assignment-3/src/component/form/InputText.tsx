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

function InputText(props: InputTextProp) {
    const { name, value, onChange, ...attributes } = props

    return (
        <div className="input-container">
            <p>{props.title}</p>
            <input name={props.name} type="text" value={props.value} onChange={props.onChange} {...attributes} />
        </div>
    );
}

export default InputText;