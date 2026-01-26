App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import pages
import Stores from "./pages/Stores.jsx";
import ContactForm from "./components/ContactForm.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Stores />} />
        <Route path="contactform" element={<ContactForm />} />
      </Routes>
    </BrowserRouter>
  );
}

// Export App
export default App;