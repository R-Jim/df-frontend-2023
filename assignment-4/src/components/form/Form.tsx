import { FormEventHandler } from 'react'

interface FormProp {
    children: JSX.Element | JSX.Element[]

    onSubmit: FormEventHandler<HTMLFormElement>
}

function Form(params: FormProp) {
    return (
        <form className="flex mt-4 flex-col gap-5" onSubmit={params.onSubmit}>
            {params.children}
        </form>
    )
}

export default Form
