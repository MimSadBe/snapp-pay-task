import {useContext, useState} from "react";
import {ContactListContext} from "../../provider/contactList";

const HeaderComponent = () => {

    const {setContactList} = useContext(ContactListContext);

    const [timer, setTimer] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [query, setQuery] = useState({
        "first_name": {"contains": ""},
        "last_name": {"contains": ""}
    });

    const handleSearch = (e) => {
        const text = e.target.value;
        const name = e.target.name;

        setQuery(prevQuery => ({
            ...prevQuery,
            [name]: {
                "contains": text
            }
        }));

        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {

            fetch(`${process.env.REACT_APP_BASE_URL}/passenger/?where={${JSON.stringify(query)}}&sort=createdAt DESC&limit=30`)
            console.log(query)
            // console.log('صدا زدن API', text);
        }, 1000);

        setTimer(newTimer);
    }

    const handleFocus = () => {
        setIsFocus(true)
    }


    return (
        <header
            className={`flex flex-col gap-2 pb-2 mb-2 border-b border-box-color sticky inset-0 bottom-auto bg-black ${isFocus ? 'h-[125px]' : 'h-[88px]'} overflow-hidden transition-all`}>
            <div className={"flex justify-between items-center"}>
                <span className={"text-main-color"}>
                    Group
                </span>
                <strong>
                    Contact
                </strong>
                <span className={"text-main-color text-3xl"}>
                      +
                </span>
            </div>
            <div className={`flex-1 w-full relative gap-2 flex flex-col`}>
                <div className={"relative"}>
                    <input
                        type="text"
                        className={"bg-box-color w-full rounded-md h-8 indent-8"}
                        placeholder={`${isFocus ? 'First Name' : 'Search'}`}
                        name={"first_name"}
                        onChange={(e) => handleSearch(e)}
                        onFocus={handleFocus}
                    />
                    <svg
                        className={"size-6 absolute inset-0 left-1 my-auto"}
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="100"
                        height="100"
                        viewBox="0 0 30 30"
                    >
                        <path
                            className={"fill-gray-color"}
                            d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                    </svg>

                </div>
                <div className={"relative"}>
                    <input
                        type="text"
                        className={"bg-box-color w-full rounded-md h-8 indent-8"}
                        placeholder={`Last Name`}
                        onChange={(e) => handleSearch(e)}
                        onFocus={handleFocus}
                        name={"last_name"}
                    />
                    <svg
                        className={"size-6 absolute inset-0 left-1 my-auto"}
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="100"
                        height="100"
                        viewBox="0 0 30 30"
                    >
                        <path
                            className={"fill-gray-color"}
                            d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                    </svg>

                </div>
            </div>
        </header>
    )
}

export default HeaderComponent