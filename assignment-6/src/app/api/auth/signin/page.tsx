'use client'

import { signIn } from 'next-auth/react'
import { SubmitHandler, FieldValues } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '../../../../components/form/Form'

function LoginPage() {
    const searchParams = useSearchParams()

    const callBackURL = searchParams.get('callbackUrl')
    const router = useRouter()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const response = await signIn('credentials', {
            email: data['email'],
            password: data['password'],
            redirect: false,
        })
        if (response?.error !== undefined) {
            toast.error(response.error)
        }
        if (response?.ok) {
            if (callBackURL !== null) {
                router.push(callBackURL)
            } else {
                router.push('/')
            }
        }
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
                        type: 'text',
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
                        type: 'password',
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
