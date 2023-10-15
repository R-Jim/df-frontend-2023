'use client'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import InputText, { InputProp } from './InputText'
import InputSelect, { InputSelectProp } from './InputSelect'
import ActionBar from '../bar/Action'
import Button from './Button'
import { Book } from '../entity/Book'

interface FormField extends InputProp, InputSelectProp {
    name: string
    type: 'TEXT' | 'SELECT'
}

interface FormAction {
    title: string
    type: 'submit' | 'reset' | 'button'
    active: boolean
}

interface FormProp {
    defaultValues: FieldValues

    fields: FormField[]
    actions: FormAction[]

    onSubmit: SubmitHandler<FieldValues | Book>
}

function Form(props: FormProp) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: props.defaultValues })

    return (
        <form
            className="flex mt-4 flex-col gap-5"
            onSubmit={handleSubmit(props.onSubmit)}
        >
            {props.fields.map(
                ({ type, name, title, options, registerOptions }) => {
                    switch (type) {
                        case 'SELECT':
                            return (
                                <InputSelect
                                    key={name}
                                    name={name}
                                    title={title}
                                    register={register}
                                    registerOptions={registerOptions}
                                    options={options}
                                    error={errors[name]?.message?.toString()}
                                />
                            )

                        default:
                            return (
                                <InputText
                                    key={name}
                                    name={name}
                                    title={title}
                                    register={register}
                                    registerOptions={registerOptions}
                                    error={errors[name]?.message?.toString()}
                                />
                            )
                    }
                },
            )}
            <ActionBar>
                {props.actions.map(({ title, type, ...rest }) => {
                    return (
                        <Button key={title} type={type} {...rest}>
                            {title}
                        </Button>
                    )
                })}
            </ActionBar>
        </form>
    )
}

export default Form
