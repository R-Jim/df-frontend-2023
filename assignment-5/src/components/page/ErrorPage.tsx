'use client'

import { useRouter } from 'next/navigation'

interface errorProp {
    code: number
    message: string
    redirect: string
    redirectMessage: string
}

export default function ErrorPage(params: errorProp) {
    const router = useRouter()

    return (
        <div className="text-center p-5">
            <h1>
                <b>{params.code}</b> - {params.message}
            </h1>
            {params.redirect === '' || params.redirect === undefined ? (
                ''
            ) : (
                <button
                    type="button"
                    className="min-w-[auto] text-[1em] text-primary-color m-4"
                    onClick={() => router.push(params.redirect)}
                >
                    {params.redirectMessage}
                </button>
            )}
        </div>
    )
}
