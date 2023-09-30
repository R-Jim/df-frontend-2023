import './Action.css';

interface ActionBarProp {
    children: JSX.Element | JSX.Element[];
}

function ActionBar(params:ActionBarProp) {
    return (
        <div className="action-bar">
            {params.children}
        </div>
    );
};

export default ActionBar;