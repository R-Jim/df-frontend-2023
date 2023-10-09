import './Action.css';

interface ActionBarProp {
    children: JSX.Element | JSX.Element[];
}

function ActionBar(props:ActionBarProp) {
    return (
        <div className="action-bar">
            {props.children}
        </div>
    );
};

export default ActionBar;