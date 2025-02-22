import { FaMapMarkerAlt, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-white text-gray-900 py-6 mt-0">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
                {/* Locations */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-lg font-semibold mb-2">Our Locations</h3>
                    <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-[#f6bd60]" /> Kathmandu</p>
                    <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-[#f6bd60]" /> Pokhara</p>
                </div>

                {/* Socials */}
                <div className="flex flex-col items-center md:items-end mt-6 md:mt-0">
                    <h3 className="text-lg font-semibold mb-2">Our Socials</h3>
                    <div className="flex gap-4">
                        <a href="#" className="text-gray-900 text-2xl hover:text-[#f6bd60] transition"><FaFacebookF /></a>
                        <a href="#" className="text-gray-900 text-2xl hover:text-[#f6bd60] transition"><FaInstagram /></a>
                        <a href="#" className="text-gray-900 text-2xl hover:text-[#f6bd60] transition"><FaTwitter /></a>
                    </div>
                </div>
            </div>
            
            {/* Copyright */}
            <div className="text-center mt-6 border-t border-gray-300 pt-4">
                <p>Created by Cizita &copy; 2024 All rights reserved!</p>
            </div>
        </footer>
    );
};

export default Footer;
