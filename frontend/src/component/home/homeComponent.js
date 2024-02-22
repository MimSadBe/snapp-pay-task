import {ContactListContext} from "../../provider/contactList";
import HeaderComponent from "../header/header";
import MainComponent from "../main/main";
import {useEffect, useState} from "react";

const HomeComponent = () => {

    const [contactList, setContactList] = useState(null)
    const [isFocus, setIsFocus] = useState(false)
    console.log("HomeComponent Rendered")
    const getData = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/passenger`)
        const data = await response.json()
        if (data) {
            setContactList(data?.items)
        }
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <div className="container py-3 relative">
            <ContactListContext.Provider value={{contactList, setContactList, isFocus, setIsFocus}}>
                <HeaderComponent/>
                <MainComponent/>
            </ContactListContext.Provider>
        </div>
    )
}

export default HomeComponent