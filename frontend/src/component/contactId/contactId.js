import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const ContactId = () => {
    const {id} = useParams();
    const [contact, setContact] = useState(null)
    const [statusModal, setStatusModal] = useState({
        phone: false,
        message: false,
        videoCall: false,
    })

    const toggleSingleProperty = (propertyName) => {
        setStatusModal(prevState => ({
            ...prevState,
            [propertyName]: !prevState[propertyName], // Dynamic property access
        }));
    };

    const getData = async () => {
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/passenger/${id}`)
        if (response) {
            let data = await response?.json()
            setContact(data)
            addToVisit(data)
        }
    }

    useEffect(() => {
        getData()
    }, [id]);

    const addToVisit = (contact) => {
        let lastVisitContact = localStorage.getItem("lastVisitContact");

        if (lastVisitContact) {
            lastVisitContact = JSON.parse(lastVisitContact);
            if (Number(lastVisitContact.totalVisit) > 0) {
                lastVisitContact.totalVisit = +lastVisitContact.totalVisit + 1
            } else {
                lastVisitContact.totalVisit = 1;

            }
            localStorage.setItem("lastVisitContact", JSON.stringify(lastVisitContact))
        } else {
            let _contact = {
                ...contact,
                "totalVisit": 1
            }
            localStorage.setItem("lastVisitContact", JSON.stringify(_contact))
        }
    }


    return (
        <div className="">
            <div
                className="bg-background-id h-screen container relative py-3 flex flex-col max-h-screen overflow-y-auto">
                <header className="flex justify-between items-center mb-4">
                    <Link to={"/"} className="text-main-color flex items-center font-semibold">
                        <img src="/assets/img/blue_left_arrow.svg" alt="Arrow left"/>
                        Contacts
                    </Link>
                    <span className="text-main-color cursor-no-drop font-semibold">Edit</span>
                </header>

                <div
                    className={"size-24 rounded-full bg-gradient-to-b from-[#a2a9b1] to-[#878b94] mx-auto flex items-center justify-center text-3xl font-bold text-white mb-2"}>
                    {
                        contact?.avatar ?
                            <img className={"w-full object-contain rounded-full"} src={`${contact?.avatar}`}
                                 alt={`${contact?.first_name + contact?.last_name}`}/>
                            :
                            contact?.first_name?.split("")[0] + " " + contact?.last_name?.split("")[0]
                    }
                </div>
                <div className="mb-6">
                    <div className={"w-full justify-center items-center flex gap-1 font-semibold text-2xl"}>
                        <span>{contact?.first_name}</span>
                        <span>{contact?.last_name}</span>
                    </div>
                    <div className="w-full justify-center items-center flex text-gray-color">
                        {contact?.company}
                    </div>
                </div>

                <div className="w-100 grid grid-cols-5 gap-2 mb-4">
                    <div
                        className="w-full bg-white rounded-xl flex items-center justify-center flex-col text-sm p-2  text-main-color  cursor-pointer relative"
                        onClick={() => toggleSingleProperty("message")}
                    >
                        <img src="/assets/img/message.svg" alt="message"/>
                        message
                        <div
                            className={`${statusModal.message ? "flex" : "hidden"} z-10 absolute -bottom-[60px] left-0 w-60 bg-white rounded-xl py-2 shadow-2xl`}>
                            <div className="flex flex-col w-full">
                                <a href={`sms:${contact?.phone}`}
                                   className="flex items-center justify-between w-full px-6 ">
                                    <div className="flex flex-col">
                                        <span className="font-semibold">mobile</span>
                                        <span className="text-gray-color">{contact?.phone}</span>
                                    </div>
                                    <img className="size-5" src="/assets/img/message-circle.svg" alt="message"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-full bg-white rounded-xl flex items-center justify-center flex-col text-sm p-2  text-main-color  cursor-pointer relative"
                        onClick={() => toggleSingleProperty("phone")}
                    >
                        <img src="/assets/img/phone.svg" alt="phone"/>
                        call
                        <div
                            className={`${statusModal.phone ? "flex" : "hidden"} z-10 absolute -bottom-[135px] left-0 w-60 bg-white rounded-xl pt-2 pb-3 shadow-2xl`}>
                            <div className="flex flex-col w-full">
                                <a href={`tel:${contact?.phone}`}
                                   className="flex items-center justify-between w-full px-6 ">
                                    <div className="flex flex-col">
                                        <span className="font-semibold">mobile</span>
                                        <span className="text-gray-color">{contact?.phone}</span>
                                    </div>
                                    <img className="size-5" src="/assets/img/phone-normal.svg" alt="phone"/>
                                </a>
                                <div className="flex flex-col pt-2 mt-2 border-t border-background-id">
                                    <div className="flex items-center font-semibold pl-4 gap-2 mb-2">
                                        <span><img src="/assets/img/arrow-down.svg" alt="arrow right"/></span>
                                        Telegram
                                    </div>
                                    <a href={`https://t.me/@${contact?.telegram}`}
                                       className="flex items-center justify-between w-full px-6 " target="_blank"
                                       rel="noreferrer">
                                        <span className="text-gray-color">@{contact?.telegram}</span>
                                        <img className="size-5" src="/assets/img/brand-telegram.svg" alt="telegram"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-full bg-white rounded-xl flex items-center justify-center flex-col text-sm p-2  text-main-color  cursor-pointer relative"
                        onClick={() => {
                            // statusModal.phone = !statusModal.phone;
                            setStatusModal(prevState => {
                                let lastState = {...prevState}
                                lastState.message = false;
                                lastState.phone = false;
                                lastState.videoCall = !lastState.videoCall;
                                return lastState
                            })
                        }}
                    >
                        <img src="/assets/img/video.svg" alt="video"/>
                        video
                        <div
                            className={`${statusModal.videoCall ? "flex" : "hidden"} z-10 absolute -bottom-[135px] left-0 w-56 bg-white rounded-xl pt-2 pb-3 shadow-2xl`}>
                            <div className="flex flex-col w-full">
                                <a href={`tel:${contact?.phone}`}
                                   className="flex items-center justify-between w-full px-6 ">
                                    <div className="flex flex-col">
                                        <span className="font-semibold">mobile</span>
                                        <span className="text-gray-color">{contact?.phone}</span>
                                    </div>
                                    <img className="size-5" src="/assets/img/phone-normal.svg" alt="phone"/>
                                </a>
                                <div className="flex flex-col pt-2 mt-2 border-t border-background-id">
                                    <div className="flex items-center font-semibold pl-4 gap-2 mb-2">
                                        <span><img src="/assets/img/arrow-down.svg" alt="arrow right"/></span>
                                        Telegram
                                    </div>
                                    <a href={`https://t.me/@${contact?.telegram}`}
                                       className="flex items-center justify-between w-full px-6 " target="_blank"
                                       rel="noreferrer">
                                        <span className="text-gray-color">@{contact?.telegram}</span>
                                        <img className="size-5" src="/assets/img/brand-telegram.svg" alt="telegram"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href={`mailto:${contact?.email}`}
                       className="w-full bg-white rounded-xl flex items-center justify-center flex-col text-sm p-2  text-main-color  cursor-pointer relative"
                    >
                        <img src="/assets/img/mail.svg" alt="mail"/>
                        mail
                    </a>
                    <div
                        className="w-full bg-white rounded-xl flex items-center justify-center flex-col text-sm p-2  text-main-color  cursor-no-drop relative grayscale">
                        <img src="/assets/img/currency-dollar.svg" alt="pay"/>
                        pay
                    </div>
                </div>

                {contact?.phone &&
                    <div className="flex flex-col p-3 rounded-xl bg-white mb-4 cursor-pointer">
                        <span className="font-semibold">phone</span>
                        <span className="text-main-color text-md">{contact?.phone}</span>
                    </div>
                }
                {contact?.telegram &&
                    <div className="flex flex-col p-3 rounded-xl bg-white mb-4 cursor-pointer">
                        <span className="font-semibold">Telegram</span>
                        <span className="text-main-color text-md">https://t.me/@{contact?.telegram}</span>
                    </div>
                }

                {contact?.note &&
                    <div className="flex flex-col p-3 rounded-xl bg-white mb-4">
                        <span className=" font-semibold">note</span>
                        <span className="text-main-color text-md">{contact?.note}</span>
                    </div>
                }

                {contact?.gender &&
                    <div className="flex flex-col p-3 rounded-xl bg-white mb-4">
                        <span className=" font-semibold">gender</span>
                        <span className="text-main-color text-md">{contact?.gender}</span>
                    </div>
                }

                <div className="flex flex-col py-3 rounded-xl bg-white mb-4">
                    <a href={`sms:${contact?.phone}`}
                       className="text-main-color border-b ml-4 pb-2 mb-2 border-background-id font-semibold">
                        Send Message
                    </a>
                    <div className="text-main-color border-b ml-4 pb-2 mb-2 border-background-id font-semibold">
                        Share Contact
                    </div>
                    <div className="text-main-color ml-4 font-semibold">Add To Favorite</div>
                </div>


                <div className="flex flex-col p-3 rounded-xl bg-white mb-4 text-main-color text-md  font-semibold">
                    Add To Emergency Contact
                </div>

                <div className="flex flex-col p-3 rounded-xl bg-white mb-4 text-main-color text-md  font-semibold">
                    Share My Location
                </div>
            </div>
        </div>
    )
}

export default ContactId