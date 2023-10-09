'use client'

import { useRouter } from 'next/navigation'

interface errorProp {
    code: number
    message: string
    redirect: string
    redirectMessage: string
}

export default function ErrorPage(props: errorProp) {
    const router = useRouter()

    return (
        <div className="text-center p-5">
            <h1>
                <b>{props.code}</b> - {props.message}
            </h1>
            {props.redirect === '' || props.redirect === undefined ? (
                ''
            ) : (
                <button
                    type="button"
                    className="min-w-[auto] text-[1em] text-primary-color m-4"
                    onClick={() => router.push(props.redirect)}
                >
                    {props.redirectMessage}
                </button>
            )}
        </div>
    )
}
