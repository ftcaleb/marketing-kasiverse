import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import pages
import Problems from "./pages/Problems";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Homepage />} />
        <Route path="/problems" element={<Problems />} />
      </Routes>
    </BrowserRouter>
    <Footer />
    </div>
    
  );
}

// Export App
export default App;


