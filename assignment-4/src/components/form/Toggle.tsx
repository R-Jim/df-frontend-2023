'use client'

interface toggleProp {
    on: boolean
    onClick: () => void
}

function Toggle(props: toggleProp) {
    return (
        <button
            type="button"
            className={`w-10 h-6 p-[2px] hover:cursor-pointer flex bg-primary-color rounded-full
                ${props.on ? ' justify-start' : ' justify-end'}`}
            onClick={() => props.onClick()}
        >
            <div className="w-5 h-5 bg-text-secondary-color rounded-full" />
        </button>
    )
}

export default Toggle
