import {useContext} from "react";
import {ContactListContext} from "../../provider/contactList";

const MainComponent = () => {
    const { contactList } = useContext(ContactListContext);
    return (
        <main className={"max-h-[calc(100vh-117px)] overflow-y-auto"}>
            <div className={"flex items-center gap-2 mb-4"}>
                <img className={"size-16 object-contain"} src={"/avatar.png"} alt=""/>
                <div className={"flex flex-col font-bold"}>
                    Sadegh Babaei
                    <small className={"text-[#8a8a8a] font-normal"}>
                        My Card
                    </small>
                </div>
            </div>
            {
                (contactList && contactList.length > 0) &&
                <div className={""}>
                    <div className={"font-bold text-[#8a8a8a] pb-1 mb-1 border-b border-[#181818] sticky"}>
                        Contact
                    </div>
                    <div className={"flex flex-col"}>
                        {
                            contactList.map((contact) => {
                                return (
                                    <div key={contact?.id} className={"pb-2 mb-1 border-b border-[#181818]"}>
                                        {contact?.first_name}
                                        <strong className={"ml-1 font-semibold"}>{contact?.last_name}</strong>
                                    </div>
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