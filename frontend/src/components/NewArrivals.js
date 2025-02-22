import { useState, useEffect } from "react";
import { fetchBooks } from "../utils/api";
import Link from "next/link";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const NewArrivals = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await fetchBooks();
                const latestBooks = response.data.slice(-8); // Get last 8 books
                setBooks(latestBooks);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        getBooks();
    }, []);

    return (
        <section className="py-10 bg-white">
            <h2 className="text-3xl font-bold text-black text-center mb-6">Explore</h2>
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                {books.map((book) => (
                    <Link key={book.id} href={`/book/${book.id}`}>
                        <div className="cursor-pointer border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-4">
                            <img src={`http://127.0.0.1:8000/media/${book.cover_image}`} alt={book.title} className="w-24 h-32 object-cover rounded-md" />
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{book.title}</h3>
                                <p className="text-gray-800 font-semibold">Rs.{book.is_on_sale ? book.sale_price : book.original_price} {book.is_on_sale && <span className="line-through text-gray-500 ml-2">Rs.{book.original_price}</span>}</p>
                                <div className="flex text-[#f6bd60] mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        i + 1 <= book.rating ? <FaStar key={i} /> : <FaStarHalfAlt key={i} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default NewArrivals;