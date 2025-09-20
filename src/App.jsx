import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Packages from "./pages/packages/Packages";
import PackageDetail from "./pages/package-detail/PackageDetail";
import "./App.css";

const App = () => {
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/package-detail/:id" element={<PackageDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
