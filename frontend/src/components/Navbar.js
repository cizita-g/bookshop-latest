import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { FiShoppingCart, FiUser } from "react-icons/fi";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const { cart } = useCart();
    const router = useRouter();

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get("http://127.0.0.1:8000/logout/");
            sessionStorage.removeItem("user");
            setUser(null);
            router.push("/auth/login");
        } catch (error) {
            alert("Logout failed!");
        }
    };

    const handleScroll = (id) => {
        const section = document.getElementById(id);
        if (section) {
            const offset = 80; // Adjust based on navbar height
            const elementPosition = section.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-20 flex items-center">
            <div className="flex justify-between items-center px-8 py-4 w-full">
                {/* Logo */}
                <div className="text-gray-800 text-2xl font-bold flex items-center">
                    <span className="text-yellow-500 text-3xl mr-2">📖</span>
                    <span>Book Sphere</span>
                </div>

                {/* Navigation Items */}
                <div className="flex justify-center gap-6">
                    {[ 
                        { label: "Home", id: "home" },
                        { label: "Featured", id: "featured" },
                        { label: "Category", id: "category" },
                        { label: "Explore", id: "explore" },
                        { label: "Blogs", id: "blogs" },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleScroll(item.id)}
                            className={`px-4 py-2 text-black font-semibold transition-colors rounded-md ${
                                router.pathname === "/" && window.location.hash === `#${item.id}` ? "bg-[#f6bd60]" : "hover:bg-gray-200"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Icons & Authentication */}
                <div className="flex items-center gap-6">
                    <button onClick={() => router.push("/cart")} className="relative text-gray-700">
                        <FiShoppingCart className="text-2xl" />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {cart.length}
                            </span>
                        )}
                    </button>
                    {user ? (
                        <button onClick={handleLogout} className="flex items-center text-gray-700">
                            <FiUser className="text-2xl mr-2" /> Logout
                        </button>
                    ) : (
                        <button onClick={() => router.push("/auth/login")} className="flex items-center text-gray-700">
                            <FiUser className="text-2xl mr-2" /> Login / Signup
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;