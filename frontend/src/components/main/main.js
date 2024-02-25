import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {ContactAppContext} from "../../context/main";

const MainComponent = () => {
    let {contactList, isFocus, setIsFocus, isLoading} = useContext(ContactAppContext);

    const [frequentlyVisitedContacts, setFrequentlyVisitedContacts] = useState(null)

    const handleFocus = () => {
        setIsFocus(false);
    }

    const getLastVisitedContact = () => {
        let lastVisitContact = localStorage.getItem("lastVisitContact");
        if (lastVisitContact) {
            lastVisitContact = JSON.parse(lastVisitContact);
            lastVisitContact.sort((a, b) => b.totalVisit - a.totalVisit);
            setFrequentlyVisitedContacts(lastVisitContact)
            console.log("parsLastVisitContact", lastVisitContact)
        }
    }

    useEffect(() => {
        getLastVisitedContact()
    }, [])

    return (
        <main
            className={`${isFocus ? 'h-[calc(100vh-160px)]' : 'h-[calc(100vh-117px)]'} overflow-y-auto flex flex-col relative`}
            onClick={() => handleFocus()}
        >
            <div className="flex items-center gap-2 mb-4 cursor-default">
                <img className="size-16 object-contain" src="/assets/img/avatar.png" alt="Avatar"/>
                <div className="flex flex-col font-bold">
                    Sadegh Babaei
                    <small className="text-[#8a8a8a] font-normal">
                        My Card
                    </small>
                </div>
            </div>
            {
                frequentlyVisitedContacts &&
                <div>
                    <div className="font-bold text-gray-color pb-1 mb-1 border-b border-bottom-color sticky top-0 bg-white">
                        Frequently visited contacts
                    </div>
                    <div className="flex flex-col">
                        {
                            frequentlyVisitedContacts.map((contact) => {
                                return (
                                    <Link to={`contact/${contact?.id}`} key={contact?.id}
                                          className="pb-2 mb-1 border-b border-bottom-color">
                                        {contact?.first_name}
                                        <strong className="ml-1 font-semibold">
                                            {contact?.last_name}
                                        </strong>

                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>

            }
            {
                isLoading ?
                    <div
                        className="w-full flex justify-center items-center flex-col h-full text-main-color text-2xl flex-1">
                        <img src="/assets/img/loading.svg" alt="loading"/>
                    </div>
                    :
                    (contactList && contactList.length > 0) ?
                        <div>
                            <div className="font-bold text-gray-color pb-1 mb-1 border-b border-bottom-color sticky top-0 bg-white">
                                Contact
                            </div>
                            <div className="flex flex-col">
                                {
                                    contactList.map((contact) => {
                                        return (
                                            <Link to={`contact/${contact?.id}`} key={contact?.id}
                                                  className="pb-2 mb-1 border-b border-bottom-color">
                                                {contact?.first_name}
                                                <strong className="ml-1 font-semibold">
                                                    {contact?.last_name}
                                                </strong>

                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :
                        <div className="w-full flex-1 justify-center items-center flex font-bold text-2xl">
                            No Result
                        </div>

            }

        </main>
    )
}

export default MainComponent