import { FormEventHandler } from 'react';
import './Form.css'

interface FormProp {
    children: JSX.Element | JSX.Element[]

    onSubmit: FormEventHandler<HTMLFormElement>;
}

function Form(params:FormProp) {
   return (
    <form className="form" onSubmit={params.onSubmit}>
        {params.children}
    </form>
   );
};

export default Form;