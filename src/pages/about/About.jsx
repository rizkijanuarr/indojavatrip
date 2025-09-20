import Navbar from "../../components/navbar/Navbar";
import AboutSection from "./AboutSection";
import FooterSection from "../home/footer/FooterSection";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

export default function About() {
    return (
        <div className="app-root-fullscreen">
            {/* Navbar Background Overlay */}
            <div className="navbar-overlay"></div>
            
            {/* Navbar Background Area */}
            <div className="navbar-background-area" style={{ height: '120px', backgroundColor: '#000' }}></div>
            
            <div className="w-full absolute top-0 left-0 z-[99999]">
                <Navbar />
            </div>

            <AboutSection />
            <FooterSection />

            {/* Scroll to Top Button */}
            <ScrollToTop />
        </div>
    );
}