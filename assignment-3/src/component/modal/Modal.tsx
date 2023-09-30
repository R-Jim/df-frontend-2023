import { MouseEventHandler } from 'react';
import './Modal.css';

export interface ModalProp {
    title: string;
    show: boolean;
    children: JSX.Element | JSX.Element[];

    onClose: MouseEventHandler;
}

function Modal(params:ModalProp) {
    return (
        <div className="modal" data-show={params.show}>
            <button className='modal-class-btn' onClick={params.onClose}>
                <img src="close.svg" className="close" alt="Close" />
            </button>
            <h1>{params.title}</h1>
            {params.children}
        </div>
    );
}

export default Modal;