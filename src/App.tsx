import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CodingEnvironment from "./pages/CodingEnvironment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <main className="w-full h-screen">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<CodingEnvironment />} />
          <Route path="*" element={<p>Path not resolved</p>} />
        </Routes>
        <ToastContainer />
      </HashRouter>
    </main>
  );
}

export default App;
