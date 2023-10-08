import Image from 'next/image'

function Profile() {
    return (
        <div className="flex items-center flex-row-reverse p-2.5 gap-2.5">
            <span>Hoshi Suisei</span>
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
