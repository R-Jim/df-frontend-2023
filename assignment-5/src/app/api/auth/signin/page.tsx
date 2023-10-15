'use client'

import { signIn } from 'next-auth/react'
import { SubmitHandler, FieldValues } from 'react-hook-form'
import Form from '../../../../components/form/Form'

function LoginPage() {
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        signIn('credentials', {
            email: data['email'],
            password: data['password'],
        })
    }

    return (
        <div className="w-[350px] absolute right-[calc(50%-175px)] bg-background-table-color border-border-color last-of-type:box-border items-center max-h-[60%] overflow-scroll p-[15px] border-[1.5px] border-solid top-1/4">
            <Form
                defaultValues={{}}
                onSubmit={onSubmit}
                fields={[
                    {
                        title: 'Email(*)',
                        name: 'email',
                        type: 'TEXT',
                        registerOptions: {
                            required: 'Email is required',
                            pattern: {
                                value: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/,
                                message: 'Email invalid',
                            },
                        },
                    },
                    {
                        title: 'Password(*)',
                        name: 'password',
                        type: 'TEXT',
                        registerOptions: {
                            required: 'Password is required',
                        },
                    },
                ]}
                actions={[
                    {
                        type: 'submit',
                        title: 'Login',
                        active: true,
                    },
                ]}
            />
        </div>
    )
}

export default LoginPage
