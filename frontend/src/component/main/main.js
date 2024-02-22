import {useContext} from "react";
import {ContactListContext} from "../../provider/contactList";
import {Link} from "react-router-dom";

const MainComponent = () => {
    let {contactList, isFocus, setIsFocus} = useContext(ContactListContext);

    const handleFocus = () => {
        setIsFocus(false);
    }

    return (
        <main className={`${isFocus ? 'max-h-[calc(100vh-160px)]' : 'max-h-[calc(100vh-117px)]'} overflow-y-auto`}
              onClick={() => handleFocus()}>
            <div className="flex items-center gap-2 mb-4">
                <img className="size-16 object-contain" src="/assets/img/avatar.png" alt="Avatar"/>
                <div className="flex flex-col font-bold">
                    Sadegh Babaei
                    <small className="text-[#8a8a8a] font-normal">
                        My Card
                    </small>
                </div>
            </div>
            {
                (contactList && contactList.length > 0) &&
                <div>
                    <div className="font-bold text-gray-color pb-1 mb-1 border-b border-bottom-color sticky">
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
            }
        </main>
    )
}

export default MainComponent