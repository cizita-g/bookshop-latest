import { useCart } from "../context/CartContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const stripePromise = loadStripe("pk_test_51QvJdGR7BATBYbryeiRQiQusxVg8yH1CwRoMXzCnuk2gd3gzCTOwqbCOpTYugLmj0JsWbSSrapKLyjScNvuD0nPl00k6eljCLi");

const Checkout = () => {
    const { cart } = useCart();
    const router = useRouter();

    useEffect(() => {
        const user = sessionStorage.getItem("user");
        if (!user) {
            alert("You must log in to access checkout.");
            router.push("/auth/login");
        }
    }, []);

    const handlePayment = async () => {
        const stripe = await stripePromise;

        try {
            if (cart.length === 0) {
                alert("Your cart is empty.");
                return;
            }

            const response = await axios.post("http://127.0.0.1:8000/create-checkout-session/", { cart });

            if (response.data.error) {
                alert("Error processing payment: " + response.data.error);
                return;
            }

            const session = response.data;
            const result = await stripe.redirectToCheckout({ sessionId: session.id });

            if (result.error) {
                alert(result.error.message);
            }
        } catch (error) {
            alert("Error processing payment: " + (error.response?.data?.error || "Unknown error"));
        }
    };

    // Calculate total price
    const totalPrice = cart.reduce(
        (acc, book) => acc + (book.is_on_sale ? book.sale_price : book.original_price) * book.quantity,
        0
    );

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto py-10 px-6 mt-20">
                <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

                {cart.length === 0 ? (
                    <p className="text-gray-600 text-center">Your cart is empty.</p>
                ) : (
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <ul className="divide-y">
                            {cart.map((book) => (
                                <li key={book.id} className="flex justify-between items-center py-4">
                                    <div className="flex items-center gap-4">
                                        <img src={book.cover_image} alt={book.title} className="w-16 h-20 object-cover rounded-md" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{book.title}</h3>
                                            <p className="text-gray-600">Quantity: {book.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-gray-900">Nrs. {book.is_on_sale ? book.sale_price * book.quantity : book.original_price * book.quantity}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between items-center mt-6 border-t pt-4 font-semibold text-gray-900">
                            <span>Total:</span>
                            <span>Nrs. {totalPrice}</span>
                        </div>
                        <button onClick={handlePayment} className="w-full bg-[#f6bd60] text-white py-3 mt-4 rounded-md font-semibold hover:bg-[#e88374] transition">
                            Pay with Stripe
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
