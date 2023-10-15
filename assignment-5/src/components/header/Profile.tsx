import { signOut, useSession } from 'next-auth/react'

import Image from 'next/image'

function Profile() {
    const { data: session } = useSession()

    if (session === null || session.user == null) {
        return null
    }

    return (
        <div className="flex items-center flex-row-reverse p-2.5 gap-2.5">
            <button
                type="button"
                onClick={() => {
                    signOut()
                }}
                className="min-w-[auto] text-[1em] underline text-primary-color decoration-secondary-color p-0"
            >
                Log out
            </button>
            <span>{session.user.email}</span>
            <Image
                width={50}
                height={50}
                className="rounded-full"
                src="/user.png"
                alt="user"
                priority={false}
            />
        </div>
    )
}

export default Profile
