import './Modal.css';

function Modal(params) {
    return (
        <div className="modal" data-show={params.show}>
            <button className='modal-class-btn' onClick={params.onClose}>
                <img src="close.svg" className="close" alt="Close" ></img>
            </button>
            <h1>{params.title}</h1>
            {params.children}
        </div>
    );
}

export default Modal;