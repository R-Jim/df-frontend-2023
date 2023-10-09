import { MouseEventHandler } from 'react'
import Image from 'next/image'

export interface ModalProp {
    title: string
    show: boolean
    children: JSX.Element | JSX.Element[]

    onClose: MouseEventHandler
}

function Modal(props: ModalProp) {
    return (
        <div
            className="w-[350px] fixed right-[calc(50%-175px)] bg-background-table-color border-border-color last-of-type:box-border items-center max-h-[60%] overflow-scroll p-[15px] border-[1.5px] border-solid top-1/4 data-[show=false]:hidden data-[show=false]:invisible data-[show=true]:visible data-[show=true]:block"
            data-show={props.show}
        >
            <button
                className="min-w-[unset] w-[2em] h-[2em] absolute p-0 right-2.5 top-2.5"
                onClick={props.onClose}
            >
                <Image src="/close.svg" width={40} height={40} alt="Close" />
            </button>
            <h1 className="text-[1.2em] m-[5px]">{props.title}</h1>
            {props.children}
        </div>
    )
}

export default Modal
