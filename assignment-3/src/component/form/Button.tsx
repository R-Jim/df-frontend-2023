import './Button.css'

interface ButtonProp {
    type?: "button" | "submit" | "reset" | undefined;
    active?: boolean;
    children: JSX.Element | string;

    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function Button(props:ButtonProp) {
    return (
        <button type={props.type} data-active={props.active} onClick={props.onClick} >
            {props.children}
        </button>
    );
};

export default Button;