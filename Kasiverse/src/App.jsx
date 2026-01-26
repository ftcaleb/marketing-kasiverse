import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import pages
import Problems from "./pages/Problems";
import Homepage from "./components/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Homepage />} />
        <Route path="/problems" element={<Problems />} />
      </Routes>
    </BrowserRouter>
  );
}

// Export App
export default App;


