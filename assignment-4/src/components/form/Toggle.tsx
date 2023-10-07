'use client'

interface toggleProp {
    on: boolean;
    onClick: Function;
}

function Toggle(params: toggleProp) {
    return (
        <div className={"w-10 h-6 p-[2px] hover:cursor-pointer flex bg-primary-color rounded-full" + (params.on ? " justify-start" : " justify-end")} onClick={() => params.onClick()}>
            <div className="w-5 h-5 bg-text-secondary-color rounded-full"></div>
        </div>
    )
};

export default Toggle;