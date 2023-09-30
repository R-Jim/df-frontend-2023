import './Button.css'

interface ButtonProp {
    type?: "button" | "submit" | "reset" | undefined;
    active?: boolean;
    children: JSX.Element | string;

    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function Button(params:ButtonProp) {
    return (
        <button type={params.type} data-active={params.active} onClick={params.onClick} >
            {params.children}
        </button>
    );
};

export default Button;