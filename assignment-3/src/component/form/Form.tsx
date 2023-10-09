import { FormEventHandler } from 'react';
import './Form.css'

interface FormProp {
    children: JSX.Element | JSX.Element[]

    onSubmit: FormEventHandler<HTMLFormElement>;
}

function Form(props:FormProp) {
   return (
    <form className="form" onSubmit={props.onSubmit}>
        {props.children}
    </form>
   );
};

export default Form;