import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./pages/home/home";
import ContactId from "./pages/contactId/contactId";
import NotFound from "./components/notFound/NotFound";

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
