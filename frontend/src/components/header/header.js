import {useContext, useRef} from "react";
import {ContactAppContext} from "../../context/main";

let timer;
const HeaderComponent = () => {

    let {setContactList, isFocus, setIsFocus, setIsLoading} = useContext(ContactAppContext);

    const from = useRef()

    const handleSearch = () => {
        setIsLoading(true)
        const formEl = from.current;
        const firstName = formEl.elements['first_name'].value ?? '';
        const lastName = formEl.elements['last_name'].value ?? '';
        const query = {
            "first_name": {"contains": firstName},
            "last_name": {"contains": lastName}
        }

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(async () => {
            let response = await fetch(`${process.env.REACT_APP_BASE_URL}/passenger/?where=${JSON.stringify(query)}&sort=createdAt DESC&limit=30`)
            if (response) {
                setIsLoading(false)
                let data = await response?.json()
                setContactList(data?.items)
            }
        }, 1000);
    }

    const handleFocus = () => {
        setIsFocus(true)
    }

    // useEffect(()=>{
    //     window?.scrollTo(100, 0)
    // },[isFocus])

    return (
        <header
            className={`${isFocus} flex flex-col gap-2 pb-2 mb-2 border-b border-box-color sticky inset-0 bottom-auto ${isFocus ? 'h-[125px]' : 'h-[85px]'} overflow-hidden transition-all`}>
            <div className="flex justify-between items-center">
                <span className="text-main-color cursor-no-drop">
                    Groups
                </span>
                <strong>
                    Contact
                </strong>
                <span className="text-main-color text-3xl cursor-no-drop">
                      +
                </span>
            </div>
            <form
                className="flex-1 w-full relative gap-2 flex flex-col"
                ref={from}
            >
                <div className="relative">
                    <input
                        type="text"
                        className="bg-box-color w-full rounded-md h-8 indent-8 focus:outline-none"
                        placeholder={`${isFocus ? 'First Name' : 'Search'}`}
                        name="first_name"
                        onChange={(e) => handleSearch(e)}
                        onFocus={() => handleFocus()}
                    />
                    <img
                        className="size-6 absolute inset-0 left-1 my-auto"
                        src="/assets/img/search.svg"
                        alt="Search"
                    />

                </div>
                <div className="relative">
                    <input
                        type="text"
                        className="bg-box-color w-full rounded-md h-8 indent-8 focus:outline-none"
                        placeholder="Last Name"
                        onChange={(e) => handleSearch(e)}
                        onFocus={() => handleFocus()}
                        name="last_name"
                    />

                    <img
                        className="size-6 absolute inset-0 left-1 my-auto"
                        src="/assets/img/search.svg"
                        alt="Search"
                    />
                </div>
            </form>
        </header>
    )
}

export default HeaderComponent