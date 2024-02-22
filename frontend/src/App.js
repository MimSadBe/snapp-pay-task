import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./component/home/home";
import ContactId from "./component/contactId/contactId";
import NotFound from "./component/notFound/notFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/contact/:id" element={<ContactId/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
