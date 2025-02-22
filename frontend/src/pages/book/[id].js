import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const API_URL = "http://127.0.0.1:8000";

const BookDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (id) {
            axios.get(`${API_URL}/books/${id}/`)
                .then((response) => {
                    setBook(response.data);
                    setLoading(false);
                })
                .catch((error) => console.error("Error fetching book details:", error));
        }
    }, [id]);

    if (loading) {
        return <p className="text-center py-10">Loading book details...</p>;
    }

    if (!book) {
        return <p className="text-center py-10">Book not found.</p>;
    }

    return (
        <div className="bg-white">
            <Navbar />
            <div className="max-w-6xl mx-auto py-16 px-6 flex flex-col md:flex-row items-center gap-10 mt-20">
                {/* Book Cover */}
                <div className="w-full md:w-1/2">
                    <img src={book.cover_image} alt={book.title} className="w-full max-w-sm shadow-lg rounded-lg" />
                </div>
                
                {/* Book Details */}
                <div className="w-full md:w-1/2 text-gray-900">
                    <h1 className="text-4xl font-bold text-[#1a237e]">{book.title}</h1>
                    <p className="text-sm text-gray-500 uppercase tracking-wider border-b-2 border-[#f6bd60] pb-2">By {book.author}</p>
                    <p className="text-gray-600 mt-4">{book.description}</p>
                    <p className="text-xl font-bold text-red-500 mt-4">
                        {book.is_on_sale ? (
                            <span>
                                <span className="line-through text-gray-500">NRs. {book.original_price}</span> NRs. {book.sale_price}
                            </span>
                        ) : (
                            <span>NRs. {book.original_price}</span>
                        )}
                    </p>
                    
                    {/* Quantity Selector & Add to Cart */}
                    <div className="flex items-center mt-6 gap-4">
                        <div className="flex items-center border border-gray-400 rounded-lg overflow-hidden">
                            <button className="px-4 py-2 bg-gray-200" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                            <span className="px-6 py-2 text-lg">{quantity}</span>
                            <button className="px-4 py-2 bg-gray-200" onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <button
                            className="bg-[#f6bd60] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#e88374] transition"
                            onClick={() => addToCart({ ...book, quantity })}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BookDetails;
