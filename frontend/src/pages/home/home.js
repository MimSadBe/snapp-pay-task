import {ContactAppContext} from "../../context/main";
import HeaderComponent from "../../components/header/Header";
import MainComponent from "../../components/main/Main";
import {useEffect, useState} from "react";

const Home = () => {

    const [contactList, setContactList] = useState(null)
    const [isFocus, setIsFocus] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const getData = async () => {
        try{
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/passenger`)
            const data = await response.json()
            if (data) {
                setContactList(data?.items)
            }

        }catch (e) {
            console.error("Check backend :)",e);
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