import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchBooks } from "../../utils/api";
import BookCard from "../../components/BookCard";
import Navbar from "../../components/Navbar";
import Footer from "@/components/Footer";

const CategoryPage = () => {
    const router = useRouter();
    const { category } = router.query;
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await fetchBooks();
                const filteredBooks = response.data.filter((book) => book.categories.includes(category));
                setBooks(filteredBooks);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        if (category) {
            getBooks();
        }
    }, [category]);

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <section className="py-20 max-w-6xl mx-auto text-center mt-10">
                <h2 className="text-3xl font-bold text-black mb-6 border-b-4 inline-block mx-auto">{category} Books</h2>
                {books.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {books.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No books available in this category.</p>
                )}
            </section>
            <Footer />
        </div>
    );
};

export default CategoryPage;
