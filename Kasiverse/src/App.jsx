import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import pages
import Problems from "./pages/Problems";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Problems />} />
      </Routes>
    </BrowserRouter>
  );
}

// Export App
export default App;
