interface ButtonProp {
    type?: 'button' | 'submit' | 'reset' | undefined
    active?: boolean
    children: JSX.Element | string

    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function Button(props: ButtonProp) {
    return (
        <button
            type={props.type}
            data-active={props.active}
            onClick={props.onClick}
            className="min-w-[90px] bg-transparent text-primary-color px-[15px] py-2.5 rounded border-none data-[active]:bg-primary-color data-[active]:text-text-secondary-color"
        >
            {props.children}
        </button>
    )
}

export default Button
