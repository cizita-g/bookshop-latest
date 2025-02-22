import { useCart } from "../context/CartContext";
import { useRouter } from "next/router";
import { FiTrash } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Cart = () => {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
    const router = useRouter();

    // Check if user is logged in
    const isLoggedIn = typeof window !== "undefined" && sessionStorage.getItem("user");

    // Calculate total price
    const totalPrice = cart.reduce(
        (acc, book) => acc + (book.is_on_sale ? book.sale_price : book.original_price) * book.quantity,
        0
    );

    const handleCheckout = () => {
        if (!isLoggedIn) {
            alert("You must log in to proceed to checkout.");
            router.push("/auth/login");  // Redirect to login page
        } else {
            router.push("/checkout");  // Redirect to checkout page
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto py-10 px-6 mt-10">
                <h1 className="text-2xl font-bold mb-6 text-black">Your Cart</h1>
                {cart.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty.</p>
                ) : (
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <div className="flex justify-between border-b pb-2 font-semibold text-gray-700">
                            <span>Product</span>
                            <span>Total</span>
                        </div>
                        <ul className="divide-y mt-4">
                            {cart.map((book) => (
                                <li key={book.id} className="flex justify-between items-center py-4">
                                    <div className="flex items-center gap-4">
                                        <img src={book.cover_image || "http://127.0.0.1:8000/media/cover_image.jpg"} alt={book.title} className="w-24 h-32 object-cover rounded-md" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{book.title}</h3>
                                            <p className="text-gray-600">Nrs. {book.is_on_sale ? book.sale_price : book.original_price}</p>
                                            <div className="flex items-center gap-2 mt-2 border border-gray-400 rounded-lg overflow-hidden w-24">
                                                <button className="w-8 h-8 bg-gray-200 text-black flex items-center justify-center" onClick={() => decreaseQuantity(book.id)}>-</button>
                                                <span className="w-8 h-8 flex items-center justify-center text-lg text-black">{book.quantity}</span>
                                                <button className="w-8 h-8 bg-gray-200 text-black flex items-center justify-center" onClick={() => increaseQuantity(book.id)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="font-bold text-gray-900">Nrs. {book.is_on_sale ? book.sale_price * book.quantity : book.original_price * book.quantity}</p>
                                        <button onClick={() => removeFromCart(book.id)} className="text-red-500 text-xl">
                                            <FiTrash />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between items-center mt-6 border-t pt-4 font-semibold text-gray-900">
                            <span>Estimated Total</span>
                            <span>Nrs. {totalPrice}</span>
                        </div>
                        <p className="text-sm text-gray-500">Taxes, discounts, and shipping calculated at checkout.</p>
                        <button onClick={handleCheckout} className="w-full bg-[#f6bd60] text-white py-3 mt-4 rounded-md font-semibold hover:bg-[#e88374] transition">
                            Check out
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
