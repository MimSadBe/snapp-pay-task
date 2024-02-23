import {useEffect, useState} from "react";

const Modal = ({type,showStatus, phoneNumber,idTelegram}) => {

    const [show, setShow] = useState(showStatus)

    useEffect(() => {
        setShow(showStatus)
    }, [showStatus]);

    return (

        <div
            className={`${show ? "flex" : "hidden"} z-10 absolute top-[calc(100%+.25rem)] inset-auto left-0 ${type !== "videoCall" ? "w-60" : "w-56"} bg-white rounded-xl py-2 shadow-2xl`}>
            <div className="flex flex-col w-full">
                <a href={`sms:${phoneNumber}`}
                   className="flex items-center justify-between w-full px-6 ">
                    <div className="flex flex-col">
                        <span className="font-semibold">mobile</span>
                        <span className="text-gray-color">{phoneNumber}</span>
                    </div>
                    <img className="size-5" src="/assets/img/message-circle.svg" alt="message"/>
                </a>
                {
                    (type !== "message") &&
                    <div className="flex flex-col pt-2 mt-2 border-t border-background-id">
                        <div className="flex items-center font-semibold pl-4 gap-2 mb-2">
                            <span><img src="/assets/img/arrow-down.svg" alt="arrow right"/></span>
                            Telegram
                        </div>
                        <a href={`https://t.me/@${idTelegram}`}
                           className="flex items-center justify-between w-full px-6 " target="_blank"
                           rel="noreferrer">
                            <span className="text-gray-color">@{idTelegram}</span>
                            <img className="size-5" src="/assets/img/brand-telegram.svg" alt="telegram"/>
                        </a>
                    </div>
                }
            </div>
        </div>

    )
}

export default Modal