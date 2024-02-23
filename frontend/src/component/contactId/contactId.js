import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Modal from "../modal/modal";


const ContactId = () => {
    const {id} = useParams();
    const [contact, setContact] = useState(null)
    const [statusModal, setStatusModal] = useState({
        phone: false,
        message: false,
        videoCall: false,
    })

    const toggleStatusModal = (propertyName) => {
        const prevState = {...statusModal};

        // Open this modal
        prevState[propertyName] = !prevState[propertyName];

        // Close other open status
        for (const key in prevState) {
            if (key !== propertyName) {
                prevState[key] = false;
            }
        }

        setStatusModal(prevState);
    };

    const getData = async () => {
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/passenger/${id}`)
        if (response) {
            let data = await response?.json()
            setContact(data)
            addToVisit(data)
        }
    }

    const addToVisit = (contact) => {
        const lastVisitContact = localStorage.getItem("lastVisitContact");
        let arrayContact = [];
        if (lastVisitContact) {
            const parsLastVisitContact = JSON.parse(lastVisitContact);
            let thisContact = parsLastVisitContact.find((item) => +item.id === +id)
            if (thisContact) {
                thisContact.totalVisit = +thisContact.totalVisit + 1
                arrayContact = [...parsLastVisitContact]
            } else {
                let _contact = {
                    ...contact,
                    "totalVisit": 1
                }
                arrayContact = [...parsLastVisitContact, _contact]
            }
            if (parsLastVisitContact.length > 4) {
                arrayContact.shift()
            }
        } else {
            let _contact = {
                ...contact,
                "totalVisit": 1
            }
            arrayContact.push(_contact)
        }
        localStorage.setItem("lastVisitContact", JSON.stringify(arrayContact))
    }

    useEffect(() => {
        getData()
    }, [id]);

    return (
        
        <div className="bg-background-id h-screen container relative py-3 flex flex-col max-h-screen overflow-y-auto">

            <header className="flex justify-between items-center mb-4">
                <Link to="/" className="text-main-color flex items-center font-semibold">
                    <img src="/assets/img/blue_left_arrow.svg" alt="Arrow left"/>
                    Contacts
                </Link>
                <span className="text-main-color cursor-no-drop font-semibold">Edit</span>
            </header>

            <div
                className="size-24 min-h-24 rounded-full bg-gradient-to-b from-[#a2a9b1] to-[#878b94] mx-auto flex items-center justify-center text-3xl font-bold text-white mb-2">
                {
                    contact?.avatar ?
                        <img className="w-full object-contain rounded-full" src={`${contact?.avatar}`}
                             alt={`${contact?.first_name + contact?.last_name}`}/>
                        :
                        (contact?.first_name && contact?.last_name) && contact?.first_name?.split("")[0] + " " + contact?.last_name?.split("")[0]
                }
            </div>

            <div className="mb-6">
                <div className="w-full justify-center items-center flex gap-1 font-semibold text-2xl">
                    <span>{contact?.first_name}</span>
                    <span>{contact?.last_name}</span>
                </div>
                <div className="w-full justify-center items-center flex text-gray-color">
                    {contact?.company}
                </div>
            </div>

            <div className="w-100 grid grid-cols-5 gap-2 mb-4">
                <div
                    className="w-full bg-white rounded-xl flex items-center justify-center flex-col text-sm p-2 text-main-color cursor-pointer relative"
                    onClick={() => toggleStatusModal("message")}
                >

                    <img src="/assets/img/message.svg" alt="message"/>
                    message

                    <Modal
                        showStatus={statusModal.message}
                        phoneNumber={contact?.phone}
                        type="message"
                    />
                </div>
                <div
                    className="w-full bg-white rounded-xl flex items-center justify-center flex-col text-sm p-2 text-main-color cursor-pointer relative"
                    onClick={() => toggleStatusModal("phone")}
                >

                    <img src="/assets/img/phone.svg" alt="phone"/>
                    call

                    <Modal
                        showStatus={statusModal.phone}
                        phoneNumber={contact?.phone}
                        type="phone"
                        idTelegram={contact?.telegram}
                    />
                </div>
                <div
                    className="w-full bg-white rounded-xl flex items-center justify-center flex-col text-sm p-2  text-main-color  cursor-pointer relative"
                    onClick={() => toggleStatusModal("videoCall")}
                >

                    <img src="/assets/img/video.svg" alt="video"/>
                    video
                    <Modal
                        showStatus={statusModal.videoCall}
                        phoneNumber={contact?.phone}
                        type="videoCall"
                        idTelegram={contact?.telegram}
                    />
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
                    <span className="font-semibold">note</span>
                    <span className="text-main-color text-md">{contact?.note}</span>
                </div>
            }

            {contact?.gender &&
                <div className="flex flex-col p-3 rounded-xl bg-white mb-4">
                    <span className="font-semibold">gender</span>
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

    )
}

export default ContactId