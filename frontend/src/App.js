import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import HomeComponent from "./component/home/homeComponent";
import ContactId from "./component/contactId/contactId";
import NotFound from "./component/notFound/notFound";

function App() {
    console.log("App.js Rendered !")
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeComponent/>}/>
                <Route path="/contact/:id" element={<ContactId/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
