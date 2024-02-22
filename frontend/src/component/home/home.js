import {ContactAppContext} from "../../provider/contactList";
import HeaderComponent from "../header/header";
import MainComponent from "../main/main";
import {useEffect, useState} from "react";

const Home = () => {

    const [contactList, setContactList] = useState(null)
    const [isFocus, setIsFocus] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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
            <ContactAppContext.Provider
                value={{contactList, setContactList, isFocus, setIsFocus, isLoading, setIsLoading}}>
                <HeaderComponent/>
                <MainComponent/>
            </ContactAppContext.Provider>
        </div>
    )
}

export default Home