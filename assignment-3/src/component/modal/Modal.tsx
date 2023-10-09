import { MouseEventHandler } from 'react';
import './Modal.css';

export interface ModalProp {
    title: string;
    show: boolean;
    children: JSX.Element | JSX.Element[];

    onClose: MouseEventHandler;
}

function Modal(props:ModalProp) {
    return (
        <div className="modal" data-show={props.show}>
            <button className='modal-class-btn' onClick={props.onClose}>
                <img src="close.svg" className="close" alt="Close" />
            </button>
            <h1>{props.title}</h1>
            {props.children}
        </div>
    );
}

export default Modal;