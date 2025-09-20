import Navbar from "../../components/navbar/Navbar";
import ContactSection from "./ContactSection";
import FooterSection from "../home/footer/FooterSection";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

export default function Contact() {
    return (
        <div className="app-root-fullscreen">
            {/* Navbar Background Area */}
            <div className="navbar-background-area" style={{ height: '120px', backgroundColor: '#000' }}></div>
            
            <div className="w-full absolute top-0 left-0 z-[99999]">
                <Navbar />
            </div>

            <ContactSection />
            <FooterSection />

            {/* Scroll to Top Button */}
            <ScrollToTop />
        </div>
    );
}