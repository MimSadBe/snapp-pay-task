import './App.css';
import HeaderComponent from "./component/header/header";
import MainComponent from "./component/main/main";
import {ContactListContext} from "./provider/contactList";
import {useEffect, useState} from "react";

function App() {

    const [contactList, setContactList] = useState(null)

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
        <div className="container w-full py-3 relative">
            <ContactListContext.Provider value={{contactList, setContactList}}>
                <HeaderComponent/>
                <MainComponent/>
            </ContactListContext.Provider>
        </div>
    );
}

export default App;
