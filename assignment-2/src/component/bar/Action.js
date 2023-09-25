import './Action.css';

function ActionBar(params) {
    return (
        <div className="action-bar">
            {params.children}
        </div>
    );
};

export default ActionBar;