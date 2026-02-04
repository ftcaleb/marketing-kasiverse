import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import ContextProvider from "./context/ContextProvider.jsx";
// Import pages
import Stores from "./pages/Stores.jsx";
import ContactForm from "./components/ContactForm.jsx"
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Problems from "./pages/Problems";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
        {/* Default route */}
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/contactform" element={<ContactForm />} />
  
      </Routes>
    </BrowserRouter>
    </ContextProvider>
 );
}
export default App;

