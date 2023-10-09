import { FormEventHandler } from 'react'

interface FormProp {
    children: JSX.Element | JSX.Element[]

    onSubmit: FormEventHandler<HTMLFormElement>
}

function Form(props: FormProp) {
    return (
        <form className="flex mt-4 flex-col gap-5" onSubmit={props.onSubmit}>
            {props.children}
        </form>
    )
}

export default Form
