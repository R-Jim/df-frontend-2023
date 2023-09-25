import './Button.css'

function Button(params) {
    return (
        <button type={params.type} data-active={params.active} onClick={params.onClick} >
            {params.children}
        </button>
    );
};

export default Button;